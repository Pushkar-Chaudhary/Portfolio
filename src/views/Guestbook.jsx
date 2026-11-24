import { useCallback, useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaPaperPlane, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { isSupabaseConfigured, supabase } from "../lib/supabase.js";
import "./Guestbook.css";

const MESSAGE_LIMIT = 500;
const GUESTBOOK_ADMIN_EMAIL = "pushkarchaudhary256@gmail.com";

function isGuestbookAdmin(user) {
  return user?.email?.trim().toLowerCase() === GUESTBOOK_ADMIN_EMAIL;
}

function getDisplayName(user) {
  return user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.user_metadata?.user_name
    || user?.email?.split("@")[0]
    || "Guest";
}

function getAvatarUrl(user) {
  return user?.user_metadata?.avatar_url
    || user?.user_metadata?.picture
    || user?.user_metadata?.avatar
    || user?.identities?.find((identity) => identity.provider === "google")?.identity_data?.picture
    || user?.identities?.find((identity) => identity.provider === "github")?.identity_data?.avatar_url;
}

function Guestbook() {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteErrorMessageId, setDeleteErrorMessageId] = useState(null);
  const [listError, setListError] = useState("");

  const loadMessages = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("guestbook_messages")
      .select("id, user_id, display_name, avatar_url, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (loadError) {
      setListError(loadError.code === "PGRST205"
        ? "The guestbook database is not set up yet. Run the guestbook SQL migration in Supabase, then reload this page."
        : loadError.code === "42501"
          ? "Guestbook read permissions are missing. Re-run the guestbook SQL migration in Supabase."
          : "Guestbook messages could not be loaded. Please try again.");
    } else {
      setMessages(data || []);
      setListError("");
    }
    setLoading(false);
  }, []);

  const syncOwnAvatar = useCallback(async (user) => {
    const avatarUrl = getAvatarUrl(user);
    if (!supabase || !user?.id || !avatarUrl) return;

    await supabase
      .from("guestbook_messages")
      .update({ avatar_url: avatarUrl })
      .eq("user_id", user.id)
      .is("avatar_url", null);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await syncOwnAvatar(data.session?.user);
      if (active) loadMessages();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        window.setTimeout(async () => {
          await syncOwnAvatar(nextSession.user);
          if (active) loadMessages();
        }, 0);
      } else {
        loadMessages();
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadMessages, syncOwnAvatar]);

  const signIn = async (provider) => {
    if (!supabase) return;
    setAuthBusy(true);
    setActionError("");
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/guestbook` },
    });
    if (authError) {
      setActionError("Sign-in could not be started. Enable this provider in Supabase Auth and allow the /guestbook redirect URL.");
      setAuthBusy(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setActionError("Sign-out failed. Please try again.");
  };

  const deleteMessage = async (messageId) => {
    if (!supabase || !isGuestbookAdmin(session?.user)) return;
    setDeleteError("");
    setDeleteErrorMessageId(null);
    setDeletingId(messageId);

    const { data: deletedRows, error: deleteError } = await supabase
      .from("guestbook_messages")
      .delete()
      .eq("id", messageId)
      .select("id");

    if (deleteError) {
      setDeleteErrorMessageId(messageId);
      setDeleteError(deleteError.code === "42501"
        ? "You are not allowed to delete guestbook messages. Apply the admin delete policy in Supabase."
        : `The message could not be deleted: ${deleteError.message}`);
    } else if (!deletedRows?.length) {
      setDeleteErrorMessageId(messageId);
      setDeleteError("Supabase did not delete this post. Check that the admin delete policy is enabled and that you are signed in as pushkarchaudhary256@gmail.com.");
    } else {
      setMessages((current) => current.filter((entry) => entry.id !== messageId));
    }
    setDeletingId(null);
  };

  const postMessage = async (event) => {
    event.preventDefault();
    const message = draft.trim();
    if (!supabase || !session?.user || !message || message.length > MESSAGE_LIMIT) return;

    setPosting(true);
    setActionError("");
    const { data, error: postError } = await supabase
      .from("guestbook_messages")
      .insert({
        user_id: session.user.id,
        display_name: getDisplayName(session.user).slice(0, 80),
        avatar_url: getAvatarUrl(session.user) || null,
        message,
      })
      .select("id, display_name, avatar_url, message, created_at")
      .single();

    if (postError) {
      setActionError(postError.message.includes("rate limit")
        ? "You’ve posted recently. Please wait a little before signing again."
        : postError.code === "42501"
          ? "Posting permissions are missing. Re-run the guestbook SQL migration in Supabase."
          : "Your message could not be posted. Please try again.");
    } else {
      setMessages((current) => [data, ...current].slice(0, 100));
      setDraft("");
    }
    setPosting(false);
  };

  return (
    <div className="page-shell page-shell--narrow guestbook-page">
      <main className="guestbook-flow">
        <header className="guestbook-header">
          <span className="section-kicker">Guestbook</span>
          <h1 className="section-title">Leave a note.</h1>
          <p className="lead">Thanks for stopping by. Leave a thought, a hello, or tell me what you’re building.</p>
        </header>

        {!isSupabaseConfigured ? (
          <section className="guestbook-setup-note" role="status">
            <h2>Guestbook setup needed</h2>
            <p>Add the Supabase project URL and public anon key to the Vite environment, then run the guestbook migration and enable Google and GitHub sign-in.</p>
          </section>
        ) : (
          <>
            <section className="guestbook-compose" aria-label="Sign and post a message">
              {session?.user ? (
                <>
                  <div className="guestbook-account-row">
                    <div className="guestbook-current-user">
                      {getAvatarUrl(session.user) ? (
                        <img
                          className="guestbook-entry-avatar"
                          src={getAvatarUrl(session.user)}
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="guestbook-entry-avatar" aria-hidden="true">
                          {getDisplayName(session.user).slice(0, 1).toUpperCase()}
                        </span>
                      )}
                      <p>Signed in as <strong>{getDisplayName(session.user)}</strong></p>
                    </div>
                    <button type="button" className="guestbook-signout" onClick={signOut}>
                      <FaSignOutAlt aria-hidden="true" /> Sign out
                    </button>
                  </div>
                  <form className="guestbook-form" onSubmit={postMessage}>
                    <label className="sr-only" htmlFor="guestbook-message">Your message</label>
                    <textarea
                      id="guestbook-message"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value.slice(0, MESSAGE_LIMIT))}
                      placeholder="Write a message…"
                      rows={4}
                      maxLength={MESSAGE_LIMIT}
                      required
                    />
                    <div className="guestbook-form-footer">
                      <span>{draft.length}/{MESSAGE_LIMIT}</span>
                      <button type="submit" className="guestbook-submit" disabled={posting || !draft.trim()}>
                        <FaPaperPlane aria-hidden="true" /> {posting ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="guestbook-signin">
                  <p>Sign in with your Google or GitHub account to leave a message.</p>
                  <div className="guestbook-auth-actions">
                    <button type="button" onClick={() => signIn("google")} disabled={authBusy}>
                      <FaGoogle aria-hidden="true" /> Continue with Google
                    </button>
                    <button type="button" onClick={() => signIn("github")} disabled={authBusy}>
                      <FaGithub aria-hidden="true" /> Continue with GitHub
                    </button>
                  </div>
                </div>
              )}
              {actionError && <p className="guestbook-error" role="alert">{actionError}</p>}
            </section>

            <section className="guestbook-entries" aria-labelledby="guestbook-entries-title">
              <div className="guestbook-list-heading">
                <h2 id="guestbook-entries-title">Messages</h2>
                <span>{messages.length} {messages.length === 1 ? "note" : "notes"}</span>
              </div>
              {loading ? (
                <p className="guestbook-empty">Loading messages…</p>
              ) : listError ? (
                <div>
                  <p className="guestbook-empty" role="alert">{listError}</p>
                  <button className="guestbook-retry" type="button" onClick={loadMessages}>Try loading again</button>
                </div>
              ) : messages.length ? (
                <ol className="guestbook-list">
                  {messages.map((entry) => (
                    <li className="guestbook-entry" key={entry.id}>
                      <div className="guestbook-entry-heading">
                        {entry.avatar_url ? (
                          <img className="guestbook-entry-avatar" src={entry.avatar_url} alt="" loading="lazy" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="guestbook-entry-avatar" aria-hidden="true">
                            {entry.display_name.slice(0, 1).toUpperCase()}
                          </span>
                        )}
                        <strong>{entry.display_name}</strong>
                        <time dateTime={entry.created_at}>
                          {new Date(entry.created_at).toLocaleDateString(undefined, {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </time>
                        {isGuestbookAdmin(session?.user) && (
                          <button
                            type="button"
                            className="guestbook-delete"
                            onClick={() => deleteMessage(entry.id)}
                            disabled={deletingId === entry.id}
                            aria-label={`Delete message from ${entry.display_name}`}
                            title="Delete message"
                          >
                            <FaTrash aria-hidden="true" />
                            <span>{deletingId === entry.id ? "Deleting…" : "Delete"}</span>
                          </button>
                        )}
                      </div>
                      <p>{entry.message}</p>
                      {deleteError && deleteErrorMessageId === entry.id && (
                        <p className="guestbook-error guestbook-delete-error" role="alert">{deleteError}</p>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="guestbook-empty">No messages yet. Be the first to sign.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Guestbook;
