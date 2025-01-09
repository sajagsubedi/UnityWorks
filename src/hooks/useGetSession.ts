import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionDataType } from "@/types/ApiTypes";

export const useGetSession = () => {
  const [session, setSession] = useState<SessionDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/getsession");
        if (response.data.isAuthenticated) {
          setSession({
            isAuthenticated: response.data.isAuthenticated,
            user: response.data.session?.user || null,
          });
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log("Error fetching session:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  return { session, loading };
};
