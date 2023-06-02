import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
function BackOfficeApp() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session) {
      router.push("/backoffice/orders");
    } else {
      router.push("/auth/signin");
    }
  }, [session]);
  return <div>backoffice app</div>;
}

export default BackOfficeApp;
