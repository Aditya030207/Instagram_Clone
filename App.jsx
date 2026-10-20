import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import "./src/index.css";
import Icon from "./src/components/Icon";
import { users, initialPosts, avatars } from "./src/data/feed";
import { deletePost, readState, storageKey } from "./src/state";
import { matchesSearch } from "./src/search";

function Avatar({ user, size = 40, story = false }) {
  return (
    <span
      className={`avatar ${story ? "ring" : ""}`}
      style={{ width: size, height: size, "--avatar-color": user.color }}
    >
      <span>
        {user.avatar && (
          <img
            key={user.avatar}
            src={user.avatar}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <span className="avatar-initials">{user.initials}</span>
      </span>
    </span>
  );
}
function Photo({ post, ...props }) {
  // A different image gets its own loading/error lifecycle. A failed story
  // must not leave the next story (or reel) stuck on the fallback.
  return <PhotoImage key={post.image} post={post} {...props} />;
}
function PhotoImage({ post, ...props }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="photo-fallback" role="img" aria-label={post.alt}>
      Photo unavailable<small>Photo unavailable · try again later</small>
    </div>
  ) : (
    <img
      src={post.image}
      alt={post.alt}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
function Modal({ title, children, close, wide = false }) {
  const dialog = useRef(null);
  const headingId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    dialog.current.showModal();
    return () => {
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby={headingId}
      className={wide ? "wide" : ""}
      onCancel={close}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        const bounds = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < bounds.left ||
          e.clientX > bounds.right ||
          e.clientY < bounds.top ||
          e.clientY > bounds.bottom
        ) close();
      }}
    >
      <div className="modal-head">
        <h2 id={headingId}>{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={close}
        >
          <Icon name="Close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
const FeedContext = createContext(null);
const storyPosts = users
  .slice(1, 9)
  .map(
    (user) =>
      initialPosts.find((post) => post.userId === user.id) || initialPosts[0],
  );
function UserRow({ user, follow = false, subtitle }) {
  const { openProfile, state, toggle } = useContext(FeedContext);
  return (
    <div className="user-row">
      <button className="user-link" onClick={() => openProfile(user.id)}>
        <Avatar user={user} />
        <span>
          <strong>{user.handle}</strong>
          <small>{subtitle || user.name}</small>
        </span>
      </button>
      {follow && (
        <button
          className={`text-button ${state.following.includes(user.id) ? "muted" : ""}`}
          aria-label={`Follow ${user.handle}`}
          aria-pressed={state.following.includes(user.id)}
          onClick={() => toggle("following", user.id)}
        >
          {state.following.includes(user.id) ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}
function Post({ post, detailed = false }) {
  const commentInput = useRef(null);
  const { openProfile, state, toggle, setModal, share, setState } =
    useContext(FeedContext);
  const user = users[post.userId] || users[0];
  const comments = state.comments[post.id] || [];
  const openComments = () => {
    if (detailed) commentInput.current?.focus();
    else setModal({ type: "post", post });
  };
  return (
    <article className="post" id={detailed ? undefined : `post-${post.id}`}>
      <header className="post-head">
        <button className="user-link" onClick={() => openProfile(user.id)}>
          <Avatar user={user} story />
          <span>
            <strong>
              {user.handle} <span className="post-time"> · {post.time}</span>
            </strong>
            <small>{post.location}</small>
          </span>
        </button>
        <button
          className="icon-button"
          aria-label={`Options for ${user.handle}'s post`}
          onClick={() => setModal({ type: "options", post })}
        >
          •••
        </button>
      </header>
      <div
        className="post-photo"
        onDoubleClick={() => {
          if (!state.liked.includes(post.id)) toggle("liked", post.id);
        }}
      >
        <Photo post={post} />
        <span className="photo-tag">{post.category}</span>
      </div>
      <div className="post-details">
        <div className="post-actions">
          <button
            className={`icon-button ${state.liked.includes(post.id) ? "liked" : ""}`}
            aria-label={`Like ${user.handle}'s post`}
            aria-pressed={state.liked.includes(post.id)}
            onClick={() => toggle("liked", post.id)}
          >
            <Icon name="Notifications" filled={state.liked.includes(post.id)} />
          </button>
          <button
            className="icon-button"
            aria-label={`Comment on ${user.handle}'s post`}
            onClick={openComments}
          >
            <Icon name="Comment" />
          </button>
          <button
            className="icon-button"
            aria-label={`Share ${user.handle}'s post`}
            onClick={() => share(post)}
          >
            <Icon name="Messages" />
          </button>
          <button
            className="icon-button save"
            aria-label={`Save ${user.handle}'s post`}
            aria-pressed={state.saved.includes(post.id)}
            onClick={() => toggle("saved", post.id)}
          >
            <Icon name="Saved" filled={state.saved.includes(post.id)} />
          </button>
        </div>
        <strong className="likes">
          {(
            post.likes + Number(state.liked.includes(post.id))
          ).toLocaleString()}{" "}
          likes
        </strong>
        <p className="caption">
          <button onClick={() => openProfile(user.id)}>{user.handle}</button>{" "}
          {post.caption}
        </p>
        <button
          className="comment-link"
          onClick={openComments}
        >
          {comments.length
            ? `View all ${comments.length} comments`
            : "Add a comment"}
        </button>
        {detailed && (
          <div className="comments">
            {comments.map((c, i) => (
              <p key={i}>
                <strong>adiarora860</strong> {c}
              </p>
            ))}
          </div>
        )}
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.comment;
            const text = input.value.trim();
            if (text)
              setState((s) => ({
                ...s,
                comments: {
                  ...s.comments,
                  [post.id]: [...(s.comments[post.id] || []), text],
                },
              }));
            input.value = "";
          }}
        >
          <input
            name="comment"
            ref={commentInput}
            pattern={".*\\S.*"}
            title="Write a comment containing more than spaces."
            aria-label={`Add a comment to ${user.handle}'s post`}
            placeholder="Add a comment…"
            maxLength={500}
            required
          />
          <button type="submit">Post</button>
        </form>
        {post.source?.startsWith("https://") ? (
          <a
            className="credit"
            href={post.source}
            target="_blank"
            rel="noreferrer"
          >
            {post.author} · {post.provider}
          </a>
        ) : (
          <span className="credit">{post.author} · {post.provider}</span>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [state, setState] = useState(() => {
    try {
      return readState(window.localStorage);
    } catch {
      return readState(null);
    }
  });
  const [view, setView] = useState("Home");
  const [filter, setFilter] = useState("For you");
  const [query, setQuery] = useState("");
  const searchInput = useRef(null);
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(null);
  const [profileId, setProfileId] = useState(0);
  const [chatId, setChatId] = useState(1);
  const [chatDrafts, setChatDrafts] = useState({});
  const chatHistory = useRef(null);
  const [toast, setToast] = useState("");
  const [limit, setLimit] = useState(6);
  const [storageError, setStorageError] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  useEffect(() => {
    if (view === "Messages" && chatHistory.current) {
      chatHistory.current.scrollTop = chatHistory.current.scrollHeight;
    }
  }, [view, chatId, state.messages]);
  useEffect(() => {
    if (view === "Search") searchInput.current?.focus();
  }, [view]);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
    document.documentElement.dataset.theme = state.theme;
  }, [state]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const toggle = (key, id) =>
    setState((s) => ({
      ...s,
      [key]: s[key].includes(id)
        ? s[key].filter((x) => x !== id)
        : [...s[key], id],
    }));
  const posts = [...state.posts, ...initialPosts];
  const navigate = (next) => {
    setView(next);
    setQuery("");
    setCategory("All");
    setLimit(6);
    if (next === "Profile") setProfileId(0);
    if (next === "Notifications") update({ read: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const openProfile = (id) => {
    setProfileId(id);
    setView("Profile");
    setModal(null);
    window.scrollTo(0, 0);
  };
  const share = async (post) => {
    const url = `${location.origin}${location.pathname}#post=${encodeURIComponent(post.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Post link copied");
    } catch {
      setModal({ type: "share", url });
    }
  };
  useEffect(() => {
    const id = new URLSearchParams(location.hash.slice(1)).get("post");
    const post = posts.find((p) => p.id === id);
    if (post) setModal({ type: "post", post });
  }, []);
  useEffect(() => {
    const openSharedPost = () => {
      const id = new URLSearchParams(location.hash.slice(1)).get("post");
      const post = [...state.posts, ...initialPosts].find((p) => p.id === id);
      if (post) setModal({ type: "post", post });
    };
    window.addEventListener("hashchange", openSharedPost);
    return () => window.removeEventListener("hashchange", openSharedPost);
  }, [state.posts]);
  const matchingPosts = posts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      matchesSearch(
        query, p.caption, p.category, users[p.userId]?.handle,
        users[p.userId]?.name, p.location,
      ),
  );
  const visiblePosts = matchingPosts
    .filter((p) => view !== "Saved" || state.saved.includes(p.id))
    .filter(
      (p) =>
        view !== "Home" ||
        filter !== "Following" ||
        state.following.includes(p.userId),
    );
  const profile = users[profileId];
  const profilePosts = posts.filter((p) => p.userId === profileId);
  const navItems = [
    "Home",
    "Reels",
    "Messages",
    "Search",
    "Notifications",
    "Create",
    "Profile",
  ];
  const grid = (items) => (
    <div className="photo-grid">
      {items.map((p) => (
        <button
          key={p.id}
          onClick={() => setModal({ type: "post", post: p })}
          aria-label={`Open post by ${users[p.userId].handle}: ${p.caption}`}
        >
          <Photo post={p} />
          <span>
            <Icon
              name="Notifications"
              size={17}
              filled={state.liked.includes(p.id)}
            />{" "}
            {(p.likes + Number(state.liked.includes(p.id))).toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
  const empty = (title, text) => (
    <div className="empty">
      <Icon name="Explore" size={38} />
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primary" onClick={() => navigate("Explore")}>
        Discover something new
      </button>
    </div>
  );
  return (
    <FeedContext.Provider
      value={{ openProfile, state, toggle, setModal, share, setState }}
    >
      <div className={`app-shell view-${view.toLowerCase()}`}>
        <a className="skip-link" href="#main">
          Skip to feed
        </a>
        <aside className="sidebar">
          <button
            className="brand"
            onClick={() => navigate("Home")}
            aria-label="Instagram home"
          >
            <span className="brand-icon">
              <Icon name="Instagram" size={28} />
            </span>
            <span>
              Instagram<span className="brand-dot">.</span>
            </span>
          </button>

          <nav aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item}
                aria-label={item}
                className={`nav-item ${view === item ? "active" : ""}`}
                aria-current={view === item ? "page" : undefined}
                onClick={() =>
                  item === "Create"
                    ? setModal({ type: "create" })
                    : navigate(item)
                }
              >
                {item === "Profile" ? (
                  <Avatar user={users[0]} size={25} />
                ) : (
                  <Icon
                    name={item === "Create" ? "Plus" : item}
                    size={26}
                    filled={item === "Home" && view === "Home"}
                  />
                )}
                <span>{item}</span>
                {item === "Messages" && <span className="nav-pill">3</span>}
                {item === "Notifications" && !state.read && (
                  <i className="notification-dot" />
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <button
              className="nav-item"
              aria-label="More"
              onClick={() => setModal({ type: "settings" })}
            >
              <Icon name="More" />
              <span>More</span>
            </button>
            <button
              className="nav-item"
              onClick={() => setModal({ type: "meta" })}
              aria-label="Also from Meta"
            >
              <Icon name="Grid" size={26} />
              <span>Also from Meta</span>
            </button>
          </div>
        </aside>
        <div className="main-shell">
          <header className="topbar">
            <button
              className="mobile-wordmark"
              onClick={() => navigate("Home")}
            >
              Instagram
            </button>
            <div className="top-actions">
              <button
                className="icon-button"
                aria-label="Search"
                onClick={() => navigate("Search")}
              >
                <Icon name="Search" />
              </button>
              <button
                className="icon-button"
                aria-label="More navigation"
                onClick={() => setModal({ type: "settings" })}
              >
                <Icon name="More" />
              </button>
            </div>
          </header>
          {storageError && (
            <div className="storage-warning" role="status">
              Your browser could not save these changes. They remain available
              until you close this page.
            </div>
          )}
          <div
            className={`content-layout ${["Messages", "Profile", "Explore", "Search"].includes(view) ? "full-layout" : ""}`}
          >
            <main id="main" tabIndex={-1}>
              {view === "Home" && (
                <>
                  <section className="stories" aria-label="Stories">
                    {users.slice(1, 9).map((u, i) => (
                      <button
                        className="story-item"
                        key={u.id}
                        onClick={() => setModal({ type: "story", index: i })}
                      >
                        <Avatar user={u} size={64} story />
                        <span>{u.handle}</span>
                      </button>
                    ))}
                  </section>
                </>
              )}
              {["Home", "Saved"].includes(view) && (
                <>
                  {view === "Saved" && (
                    <p className="section-intro">
                      Saved posts are stored in this browser.
                    </p>
                  )}
                  <div className="feed">
                    {visiblePosts.slice(0, limit).map((post) => (
                      <Post key={post.id} post={post} />
                    ))}
                    {!visiblePosts.length &&
                      empty(
                        view === "Saved"
                          ? "Saved posts"
                          : "Your circle starts here",
                        view === "Saved"
                          ? "Tap the bookmark on any post to save it here."
                          : "Follow a few creators to make this feed your own.",
                      )}
                    {visiblePosts.length > limit && (
                      <button
                        className="load-more"
                        onClick={() => setLimit((n) => n + 6)}
                      >
                        Load more <Icon name="Plus" size={17} />
                      </button>
                    )}
                    {visiblePosts.length > 0 &&
                      visiblePosts.length <= limit && (
                        <p className="feed-end">You’re all caught up.</p>
                      )}
                  </div>
                </>
              )}
              {["Search", "Explore"].includes(view) && (
                <>
                  <label className="search-field">
                    <Icon name="Search" />
                    <input
                      ref={searchInput}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      aria-label="Search people and posts"
                    />
                    {query && (
                      <button
                        className="icon-button"
                        aria-label="Clear search"
                        onClick={() => {
                          setQuery("");
                          searchInput.current?.focus();
                        }}
                      >
                        <Icon name="Close" size={18} />
                      </button>
                    )}
                  </label>
                  {view === "Search" && query.trim() && (
                    <section className="people-results">
                      <h3>People</h3>
                      {users
                        .filter((u) =>
                          matchesSearch(query, u.handle, u.name),
                        )
                        .slice(0, 6)
                        .map((u) => (
                          <UserRow key={u.id} user={u} follow={u.id !== 0} />
                        ))}
                    </section>
                  )}
                  {matchingPosts.length ? (
                    grid(matchingPosts)
                  ) : (
                    <div className="empty">
                      <h2>No matches yet</h2>
                      <p>Try another name, place, or topic.</p>
                    </div>
                  )}
                </>
              )}
              {view === "Profile" && (
                <>
                  <section className="profile-header">
                    <Avatar user={profile} size={100} />
                    <div>
                      <span className="eyebrow">CREATOR PROFILE</span>
                      <h2>{profile.handle}</h2>
                      <p>{profile.name}</p>
                      <p>
                        {profileId === 0 && state.bio ? state.bio : profile.bio}
                      </p>
                      <div className="profile-stats">
                        <span>
                          <strong>{profilePosts.length}</strong> posts
                        </span>
                        <span>
                          <strong>
                            {profileId === 0
                              ? state.following.length
                              : 128 + profileId * 71}
                          </strong>{" "}
                          {profileId === 0 ? "following" : "demo followers"}
                        </span>
                      </div>
                      {profileId === 0 ? (
                        <button
                          className="secondary"
                          onClick={() => setModal({ type: "edit" })}
                        >
                          Edit profile
                        </button>
                      ) : (
                        <button
                          className="primary"
                          aria-label={`Follow ${profile.handle}`}
                          aria-pressed={state.following.includes(profileId)}
                          onClick={() => toggle("following", profileId)}
                        >
                          {state.following.includes(profileId)
                            ? "Following"
                            : "Follow"}
                        </button>
                      )}
                    </div>
                  </section>
                  <h3 className="grid-label">
                    <Icon name="Grid" size={17} /> Posts
                  </h3>
                  {profilePosts.length
                    ? grid(profilePosts)
                    : empty(
                        "No posts yet",
                        "Create your first post using the button above.",
                      )}
                </>
              )}
              {view === "Notifications" && (
                <section className="activity">
                  <div className="section-title">
                    <h2>Notifications</h2>
                    <span className="muted">Demo activity</span>
                  </div>
                  {users.slice(1, 8).map((u, i) => (
                    <div className="activity-row" key={u.id}>
                      <Avatar user={u} />
                      <p>
                        <button onClick={() => openProfile(u.id)}>
                          <strong>{u.handle}</strong>
                        </button>{" "}
                        {i % 2 ? "liked your post." : "started following you."}
                        <small>{i + 1}h ago</small>
                      </p>
                      <button
                        className="text-button"
                        onClick={() => openProfile(u.id)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </section>
              )}
              {view === "Messages" && (
                <section className="inbox">
                  <div className="chat-list">
                    <h2>Your conversations</h2>
                    <p className="muted">
                      Local demo · messages stay on this device
                    </p>
                    {users.slice(1, 7).map((u) => (
                      <button
                        className={`chat-contact ${chatId === u.id ? "selected" : ""}`}
                        aria-current={chatId === u.id ? "true" : undefined}
                        key={u.id}
                        onClick={() => setChatId(u.id)}
                      >
                        <Avatar user={u} />
                        <span>
                          <strong>{u.name}</strong>
                          <small>
                            {state.messages[u.id]?.at(-1) ||
                              "Sent you a message"}
                          </small>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="chat-panel">
                    <UserRow
                      user={users[chatId]}
                      subtitle="Demo conversation"
                    />
                    <div className="chat-bubbles" ref={chatHistory}>
                      <p className="bubble">hey, did you see this?</p>
                      {(state.messages[chatId] || []).map((m, i) => (
                        <p className="bubble own" key={i}>
                          {m}
                        </p>
                      ))}
                    </div>
                    <form
                      className="message-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.message;
                        const value = input.value.trim();
                        if (value)
                          setState((s) => ({
                            ...s,
                            messages: {
                              ...s.messages,
                              [chatId]: [...(s.messages[chatId] || []), value],
                            },
                          }));
                        setChatDrafts((drafts) => ({ ...drafts, [chatId]: "" }));
                      }}
                    >
                      <input
                        name="message"
                        value={chatDrafts[chatId] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setChatDrafts((drafts) => ({ ...drafts, [chatId]: value }));
                        }}
                        placeholder="Write a message…"
                        pattern={".*\\S.*"}
                        title="Write a message containing more than spaces."
                        aria-label={`Message to ${users[chatId].name}`}
                        required
                        maxLength={1000}
                      />
                      <button
                        className="icon-button"
                        aria-label={`Send demo message to ${users[chatId].name}`}
                      >
                        <Icon name="Messages" />
                      </button>
                    </form>
                  </div>
                </section>
              )}
              {view === "Reels" && (
                <section className="reel-section">
                  <div className="reel">
                    <Photo post={initialPosts[reelIndex]} />
                    <div className="reel-caption">
                      <span className="eyebrow">
                        {reelIndex + 1} / {initialPosts.length}
                      </span>
                      <h2>{initialPosts[reelIndex].location}</h2>
                      <p>{initialPosts[reelIndex].caption}</p>
                      <button
                        className="secondary"
                        onClick={() =>
                          setModal({
                            type: "post",
                            post: initialPosts[reelIndex],
                          })
                        }
                      >
                        Open post
                      </button>
                    </div>
                  </div>
                  <div className="reel-controls">
                    <button
                      className="secondary"
                      disabled={reelIndex === 0}
                      onClick={() => setReelIndex((i) => i - 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="primary"
                      onClick={() =>
                        setReelIndex((i) => (i + 1) % initialPosts.length)
                      }
                    >
                      Next <Icon name="Arrow" size={17} />
                    </button>
                  </div>
                </section>
              )}
            </main>
            {!["Messages", "Profile", "Explore", "Search"].includes(view) && (
              <aside className="right-rail">
                <UserRow user={users[0]} subtitle="Aditya Arora" />
                <section className="suggestions">
                  <div className="section-title">
                    <h3>Suggested for you</h3>
                    <button
                      className="text-button dark-text"
                      onClick={() => navigate("Search")}
                    >
                      See all
                    </button>
                  </div>
                  {users.slice(5, 10).map((u) => (
                    <UserRow
                      user={u}
                      key={u.id}
                      follow
                      subtitle={
                        u.id % 2 ? "Suggested for you" : "Suggested for you"
                      }
                    />
                  ))}
                </section>
                <footer>
                  <button onClick={() => setModal({ type: "about" })}>
                    About
                  </button>
                  <span> · </span>
                  <button onClick={() => setModal({ type: "credits" })}>
                    Image credits
                  </button>

                  <small>© 2026 INSTAGRAM CLONE</small>
                </footer>
              </aside>
            )}
          </div>
        </div>
        {view !== "Messages" && (
          <button
            className="floating-messages"
            onClick={() => navigate("Messages")}
          >
            <Icon name="Messages" size={26} />
            <strong>Messages</strong>
            <Avatar user={users[0]} size={28} />
          </button>
        )}
        {modal && (
          <Modal
            key={modal.type}
            title={
              {
                create: "Create new post",
                post: "Post",
                story: "Stories",
                settings: "Settings",
                about: "About",
                credits: "Image credits",
                edit: "Edit your profile",
                options: "Post options",
                share: "Share post",
                meta: "Also from Meta",
              }[modal.type]
            }
            close={() => setModal(null)}
            wide={modal.type === "post"}
          >
            {modal.type === "meta" && (
              <div className="modal-body settings">
                <a
                  href="https://www.meta.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Meta ↗
                </a>
                <a
                  href="https://www.threads.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Threads ↗
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook ↗
                </a>
              </div>
            )}
            {modal.type === "post" && (
              <Post key={modal.post.id} post={modal.post} detailed />
            )}
            {modal.type === "create" && (
              <Composer
                publish={(post) => {
                  setState((s) => ({ ...s, posts: [post, ...s.posts] }));
                  setModal(null);
                  navigate("Home");
                  setFilter("For you");
                  setToast("Post shared");
                }}
              />
            )}
            {modal.type === "story" && (
              <div className="story-view">
                <div className="story-progress">
                  {users.slice(1, 9).map((u, i) => (
                    <span
                      className={i <= modal.index ? "seen" : ""}
                      key={u.id}
                    />
                  ))}
                </div>
                <UserRow user={users[modal.index + 1]} />
                <Photo post={storyPosts[modal.index]} />
                <p>{storyPosts[modal.index].caption}</p>
                <div className="reel-controls">
                  <button
                    className="secondary"
                    disabled={modal.index === 0}
                    onClick={() =>
                      setModal((m) => ({ ...m, index: m.index - 1 }))
                    }
                  >
                    Previous
                  </button>
                  <button
                    className="primary"
                    onClick={() =>
                      modal.index < 7
                        ? setModal((m) => ({ ...m, index: m.index + 1 }))
                        : setModal(null)
                    }
                  >
                    {modal.index < 7 ? "Next story" : "Done"}
                  </button>
                </div>
              </div>
            )}
            {modal.type === "settings" && (
              <div className="modal-body settings">
                <div className="more-navigation">
                  {navItems
                    .filter((n) => n !== "Create")
                    .map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setModal(null);
                          navigate(n);
                        }}
                      >
                        <Icon name={n} />
                        {n}
                      </button>
                    ))}
                </div>
                <button
                  onClick={() =>
                    update({
                      theme: state.theme === "light" ? "dark" : "light",
                    })
                  }
                >
                  <Icon name="Sun" /> Switch to{" "}
                  {state.theme === "light" ? "dark" : "light"} appearance
                </button>
                <button
                  onClick={() => {
                    setModal(null);
                    navigate("Saved");
                  }}
                >
                  <Icon name="Saved" /> Saved
                </button>
                <button onClick={() => setModal({ type: "about" })}>
                  <Icon name="Explore" /> About & privacy
                </button>
                <button onClick={() => setModal({ type: "credits" })}>
                  <Icon name="Grid" /> Image sources & licenses
                </button>
              </div>
            )}
            {modal.type === "about" && (
              <div className="modal-body prose">
                <h3>Instagram clone</h3>
                <p>
                  An independent Instagram-inspired portfolio demo by Aditya
                  Arora. Not affiliated with Instagram or Meta.
                </p>
                <p>
                  Profiles, activity, and conversations are fictional. Likes,
                  follows, comments, posts, and messages are saved only in this
                  browser. There is no account system or message delivery
                  service.
                </p>
                <p>
                  Images load from Lorem Picsum and the Metropolitan Museum of
                  Art, which receive normal image requests from your browser.
                </p>
              </div>
            )}
            {modal.type === "credits" && (
              <div className="modal-body prose">
                <p>
                  Freely usable photography and public-domain art, with original
                  creator credits. Photos are licensed, not necessarily
                  copyright-free. Displayed profile names are fictional and do
                  not identify the photographers.
                </p>
                {avatars.map((a) => (
                  <p key={a.id}>
                    <a href={a.source} target="_blank" rel="noreferrer">
                      {a.author}
                    </a>
                    <small>Profile photo · Unsplash License</small>
                  </p>
                ))}
                {initialPosts.map((p) => (
                  <p key={p.id}>
                    <a href={p.source} target="_blank" rel="noreferrer">
                      {p.title || p.author}
                    </a>
                    <small>
                      {p.provider} ·{" "}
                      <a href={p.licenseUrl} target="_blank" rel="noreferrer">
                        {p.license}
                      </a>
                    </small>
                  </p>
                ))}
              </div>
            )}
            {modal.type === "edit" && (
              <form
                className="modal-body form-stack"
                onSubmit={(e) => {
                  e.preventDefault();
                  update({ bio: e.currentTarget.elements.bio.value.trim() });
                  setModal(null);
                  setToast("Profile updated");
                }}
              >
                <label>
                  Your bio
                  <textarea
                    name="bio"
                    maxLength={160}
                    defaultValue={state.bio || users[0].bio}
                  />
                </label>
                <button className="primary">Save changes</button>
              </form>
            )}
            {modal.type === "share" && (
              <div className="modal-body">
                <label>
                  Copy this post link
                  <input
                    readOnly
                    value={modal.url}
                    onFocus={(e) => e.target.select()}
                  />
                </label>
              </div>
            )}
            {modal.type === "options" && (
              <div className="modal-body settings">
                <button
                  onClick={() => {
                    toggle("saved", modal.post.id);
                    setModal(null);
                  }}
                >
                  <Icon name="Saved" />
                  {state.saved.includes(modal.post.id)
                    ? "Remove from saved"
                    : "Save post"}
                </button>
                <button onClick={() => openProfile(modal.post.userId)}>
                  <Icon name="Profile" /> Visit profile
                </button>
                {modal.post.source?.startsWith("https://") && (
                  <a href={modal.post.source} target="_blank" rel="noreferrer">
                    View original image & credits ↗
                  </a>
                )}
                {modal.post.userId === 0 && (
                  <button
                    className="danger"
                    onClick={() => {
                      setState((s) => deletePost(s, modal.post.id));
                      setModal(null);
                      setToast("Post deleted");
                    }}
                  >
                    Delete your post
                  </button>
                )}
              </div>
            )}
          </Modal>
        )}
        {toast && (
          <div className="toast" role="status">
            <Icon name="Check" size={18} />
            {toast}
          </div>
        )}
      </div>
    </FeedContext.Provider>
  );
}
function Composer({ publish }) {
  const [selected, setSelected] = useState(initialPosts[0]);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  async function upload(file) {
    if (!file || loading) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 1500000
    ) {
      setUploadError("Choose a JPG, PNG, or WebP under 1.5 MB.");
      return;
    }
    setLoading(true);
    setUploadError("");
    const reader = new FileReader();
    reader.onload = () => {
      setSelected({
        image: reader.result,
        alt: file.name,
        author: "You",
        provider: "Your upload",
        source: "#",
        category: "Everyday",
      });
      setLoading(false);
    };
    reader.onerror = () => {
      setUploadError("Could not read this image. Please try another.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }
  return (
    <form
      className="modal-body form-stack"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (!String(data.get("caption")).trim() || loading) return;
        publish({
          ...selected,
          id: `local-${crypto.randomUUID()}`,
          userId: 0,
          caption: String(data.get("caption")).trim(),
          alt: String(data.get("alt")).trim() || selected.alt,
          location:
            String(data.get("location")).trim() || "A moment of your own",
          likes: 0,
          time: "now",
        });
      }}
    >
      <p className="muted">Select a photo.</p>
      <div className="composer-preview">
        <Photo key={selected.image} post={selected} />
      </div>
      <div className="image-picker">
        {initialPosts.slice(0, 8).map((p, index) => (
          <button
            type="button"
            key={p.id}
            aria-label={`Choose photo ${index + 1}: ${p.alt}`}
            aria-pressed={selected.image === p.image}
            disabled={loading}
            onClick={() => {
              setSelected(p);
              setUploadError("");
            }}
          >
            <Photo post={p} />
          </button>
        ))}
      </div>
      <label className="upload-label">
        Upload your photo{" "}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={loading}
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            e.currentTarget.value = "";
            upload(file);
          }}
        />
      </label>
      {uploadError && (
        <p role="alert" className="danger">
          {uploadError}
        </p>
      )}
      <label>
        Caption
        <textarea
          name="caption"
          placeholder="Write a caption…"
          maxLength={1500}
          onChange={(e) => {
            e.currentTarget.setCustomValidity(
              e.currentTarget.value.trim()
                ? ""
                : "Write a caption before sharing.",
            );
          }}
          required
        />
      </label>
      <label>
        Location
        <input name="location" placeholder="Add location" maxLength={80} />
      </label>
      <label>
        Image description
        <input
          name="alt"
          placeholder="Describe your image for screen readers"
          maxLength={200}
        />
      </label>
      <p className="muted">This demo saves posts in your browser.</p>
      <button className="primary" disabled={loading}>
        {loading ? "Reading photo…" : "Share"}
      </button>
    </form>
  );
}
