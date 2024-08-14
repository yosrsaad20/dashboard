import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("authenticated");
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setLoading(false); // Set loading to false when authenticated
      }
    };

    checkAuth();
  }, [router]);

  // Show loading indicator or nothing while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
