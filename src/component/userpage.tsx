"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface gitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export default function UserPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("search") || "";
  const [user, setUser] = useState<gitHubUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("USER NOT FOUND");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const openDetails = () => {
    window.open(`/user/${username}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {loading && <p className="text-4xl text-sky-500">Loading......</p>}
      {error && <p className="text-4xl text-sky-500">{error}</p>}
      {user && (
        <div className="mt-6 p-6 border rounded w-full max-w-md text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-40 h-40 rounded-full mx-auto"
          />
          <h2 className="text-xl font-bold mt-4">{user.name}</h2>
          <p className="text-xl font-bold mt-2 text-gray-400">@{user.login}</p>
          {user.bio && <p className="mt-2 text-xl font-bold">{user.bio}</p>}
          <div className="flex justify-around mt-4 text-lg text-gray-400">
            <div>
              <p className="font-medium">{user.public_repos}</p>
              <p>Repos</p>
            </div>
            <div>
              <p className="font-medium">{user.followers}</p>
              <p>Followers</p>
            </div>
            <div>
              <p className="font-medium">{user.following}</p>
              <p>Following</p>
            </div>
          </div>
          <div className="mt-5">
            <button onClick={openDetails} className="text-sky-400 cursor-pointer">
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
