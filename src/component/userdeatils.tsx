import { notFound } from "next/navigation";
import { format } from "date-fns";

type PageProps = {
  params: {
    username: string;
  };
};

export async function generateStaticParams() {
  return [];
}

export default async function UserDetails({ params }: PageProps) {
  const { username } = params;

  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 },
  });

  if (!userRes.ok) {
    notFound();
  }

  const user = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/${username}/repos`, {
    next: { revalidate: 60 },
  });

  const repos = reposRes.ok ? await reposRes.json() : [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden mb-10">
        <div className="flex flex-col md:flex-row p-6 gap-6">
          <div className="flex justify-center md:block">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-40 h-40 rounded-full border-4 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start flex-col md:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.name || user.login}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">@{user.login}</p>
              </div>
              <p className="text-sm text-gray-400 mt-2 md:mt-0">
                Joined {format(new Date(user.created_at), "PPP")}
              </p>
            </div>
            {user.bio && <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>}
            <div className="mt-4 flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold">{user.followers}</span> followers
              </div>
              <div>
                <span className="font-semibold">{user.following}</span> following
              </div>
              <div>
                <span className="font-semibold">{user.public_repos}</span> repos
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              {user.location && <div>📍 {user.location}</div>}
              {user.blog && (
                <div>
                  🔗{" "}
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div>
                  🐦{" "}
                  <a
                    href={`https://twitter.com/${user.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    @{user.twitter_username}
                  </a>
                </div>
              )}
              {user.company && <div>🏢 {user.company}</div>}
            </div>
            <div className="mt-6">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Repositories</h2>
        {repos.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No public repositories found.</p>
        ) : (
          <div className="grid gap-4">
            {repos.map((repo: any) => (
              <div key={repo.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{repo.description}</p>
                )}
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2 flex-wrap">
                  {repo.language && <span>🖥️ {repo.language}</span>}
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  {repo.license?.name && <span>📄 {repo.license.name}</span>}
                  <span>⏱️ Updated {format(new Date(repo.updated_at), "MMM dd, yyyy")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
