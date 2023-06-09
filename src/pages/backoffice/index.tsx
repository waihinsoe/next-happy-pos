import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getSelectedLocationId } from "@/utils";
import { fetchAppData } from "@/store/slices/appSlice";
function BackOfficeApp() {
  const { isLoading } = useAppSelector((state) => state.app);
  const { data: session } = useSession();
  const router = useRouter();
  const selectedLocationId = getSelectedLocationId() as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      !isLoading && router.push("/backoffice/orders");
    } else {
      router.push("/auth/signin");
    }
  }, [session, isLoading, router]);

  useEffect(() => {
    dispatch(fetchAppData(selectedLocationId));
  }, []);
  return <div>backoffice app</div>;
}

export default BackOfficeApp;
