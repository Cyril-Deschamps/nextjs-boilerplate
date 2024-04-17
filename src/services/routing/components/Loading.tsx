import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  debounce?: boolean;
}

const Loading: FunctionComponent<Props> = ({ debounce = true }) => {
  const [showLoading, setShowLoading] = useState(!debounce);
  useEffect(() => {
    if (debounce) {
      const handler = setTimeout(() => setShowLoading(true), 200);

      return () => {
        clearTimeout(handler);
      };
    }
  });

  if (!showLoading) return null;
  return <></>;
};

export default Loading;
