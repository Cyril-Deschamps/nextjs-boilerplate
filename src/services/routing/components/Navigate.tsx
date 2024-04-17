import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next-translate-routes/router";
import { FunctionComponent, useEffect } from "react";

interface Props {
  to: Url;
}

const Navigate: FunctionComponent<Props> = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return null;
};

export default Navigate;
