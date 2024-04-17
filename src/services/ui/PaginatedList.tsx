import Image from "next/image";
import { useCallback, useEffect, useMemo } from "react";
import iconArrowMiniLeft from "../../assets/img/icons/icon-chevron-left.svg";
import iconArrowMiniRight from "../../assets/img/icons/icon-chevron-right.svg";
import iconEndArrowLeft from "../../assets/img/icons/icon-end-arrow-left.svg";
import iconEndArrowRight from "../../assets/img/icons/icon-end-arrow-right.svg";
import { useRouter } from "next-translate-routes";
import { useTranslation } from "next-i18next";

const PaginatedList = <Item,>({
  items,
  render,
  paginatedBy,
  className,
  id,
}: {
  items: Item[];
  render: (item: Item) => JSX.Element | null;
  paginatedBy: number;
  className?: string;
  id: string;
}): JSX.Element => {
  const { push, pathname, isReady, query } = useRouter();
  const { t } = useTranslation("website");
  const page = useMemo(
    () => (isReady ? (query?.page ? parseInt(query.page as string) : 1) : null),
    [isReady, query.page],
  );

  const setPage = useCallback(
    (page: number) => {
      push({ pathname: pathname, query: { page } }, undefined, {
        shallow: true,
      });
    },
    [pathname, push],
  );

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    async function changePageEffect() {
      const element = document.getElementById(id);
      const y = element!.getBoundingClientRect().top + window.scrollY - 300;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    if (document) {
      changePageEffect();
    }
  }, [id, page]);

  // Memos
  const lastPage = useMemo(
    () => Math.ceil(items.length / paginatedBy),
    [items.length, paginatedBy],
  );
  const paginatedList = useMemo(() => {
    return new Map(
      [...Array(lastPage).keys()].map((page) => [
        page + 1,
        items.slice(page * paginatedBy, (page + 1) * paginatedBy),
      ]),
    );
  }, [items, lastPage, paginatedBy]);
  const currentPage = useMemo(
    () => (page ? paginatedList.get(page) || [] : []),
    [paginatedList, page],
  );

  const hasPageOffset = useCallback(
    (offset: number) => {
      return page
        ? offset > 0
          ? page + offset <= lastPage
          : page + offset >= 1
        : null;
    },
    [page, lastPage],
  );
  const hasPreviousPage = useMemo(() => hasPageOffset(-1), [hasPageOffset]);
  const hasNextPage = useMemo(() => hasPageOffset(1), [hasPageOffset]);

  // Methods
  const goToOffset = useCallback(
    (offset: number) => (page ? setPage(page + offset) : null),
    [page, setPage],
  );
  const goToNextPage = useCallback(() => goToOffset(1), [goToOffset]);
  const goToPreviousPage = useCallback(() => goToOffset(-1), [goToOffset]);

  return (
    <div id={id}>
      {page && (
        <>
          {currentPage.length > 0 ? (
            <div className={className}>
              {currentPage.map((item) => render(item))}
            </div>
          ) : (
            <p className={"py-l text-center w-full"}>{t("no_result")}...</p>
          )}
          {lastPage > 1 && (
            <div
              className={
                "flex gap-m mt-2xl mb-m bg-white p-3 rounded shadow-sm max-w-fit mx-auto"
              }
            >
              <button
                className={"bg-gray-200 p-2 px-[0.6rem] rounded"}
                disabled={!hasPreviousPage}
                onClick={() => setPage(1)}
                type={"button"}
              >
                <Image
                  alt={"start arrow"}
                  className={"w-2"}
                  src={iconEndArrowLeft}
                />
              </button>
              <button
                className={"bg-gray-200 p-1 rounded"}
                disabled={!hasPreviousPage}
                onClick={() => goToPreviousPage()}
                type={"button"}
              >
                <Image
                  alt={"previous page arrow"}
                  className={"w-5"}
                  src={iconArrowMiniLeft}
                />
              </button>

              <div className={"flex flex-row gap-m"}>
                {!hasNextPage && hasPageOffset(-2) && (
                  <button onClick={() => goToOffset(-2)} type={"button"}>
                    {page - 2}
                  </button>
                )}
                {hasPreviousPage && (
                  <button onClick={() => goToPreviousPage()} type={"button"}>
                    {page - 1}
                  </button>
                )}
                <button className={"font-bold"}>{page}</button>
                {hasNextPage && (
                  <button onClick={() => goToNextPage()} type={"button"}>
                    {page + 1}
                  </button>
                )}
                {!hasPreviousPage && hasPageOffset(2) && (
                  <button onClick={() => goToOffset(2)} type={"button"}>
                    {page + 2}
                  </button>
                )}
              </div>

              <button
                className={"bg-gray-200 p-1 rounded"}
                disabled={!hasNextPage}
                onClick={() => goToNextPage()}
                type={"button"}
              >
                <Image
                  alt={"next page arrow"}
                  className={"w-5"}
                  src={iconArrowMiniRight}
                />
              </button>
              <button
                className={"bg-gray-200 p-2 px-[0.6rem] rounded"}
                disabled={!hasNextPage}
                onClick={() => setPage(lastPage)}
                type={"button"}
              >
                <Image
                  alt={"end arrow"}
                  className={"w-2"}
                  src={iconEndArrowRight}
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaginatedList;
