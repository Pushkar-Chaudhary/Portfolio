create table if not exists public.guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 80),
  avatar_url text,
  message text not null check (char_length(btrim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.guestbook_messages
  add column if not exists avatar_url text;

create index if not exists guestbook_messages_created_at_idx
  on public.guestbook_messages (created_at desc);

alter table public.guestbook_messages enable row level security;

grant select on public.guestbook_messages to anon, authenticated;
grant insert (user_id, display_name, avatar_url, message)
  on public.guestbook_messages to authenticated;
grant update (avatar_url)
  on public.guestbook_messages to authenticated;
grant delete on public.guestbook_messages to authenticated;

create policy "Anyone can read guestbook messages"
  on public.guestbook_messages
  for select
  to anon, authenticated
  using (true);

create policy "Users can post as themselves"
  on public.guestbook_messages
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and char_length(btrim(display_name)) between 1 and 80
    and char_length(btrim(message)) between 1 and 500
  );

create policy "Users can add their own guestbook avatar"
  on public.guestbook_messages
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Guestbook owner can delete any message"
  on public.guestbook_messages
  for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'pushkarchaudhary256@gmail.com');

create or replace function public.limit_guestbook_posts()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  recent_posts integer;
begin
  perform pg_advisory_xact_lock(hashtext(new.user_id::text)::bigint);

  select count(*) into recent_posts
  from public.guestbook_messages
  where user_id = new.user_id
    and created_at > now() - interval '1 hour';

  if recent_posts >= 5 then
    raise exception 'Guestbook rate limit reached. Try again later.';
  end if;

  return new;
end;
$$;

revoke all on function public.limit_guestbook_posts() from public, anon, authenticated;

create trigger guestbook_post_rate_limit
  before insert on public.guestbook_messages
  for each row execute function public.limit_guestbook_posts();
