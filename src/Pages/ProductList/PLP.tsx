import React, { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHooks";
import {
  fetchMoreProducts,
  getProducts,
  setSortCriteria,
} from "./ProductSlice";
import selectFilteredProducts from "./Selector";
import Sorting from "../../Components/Atom/Sorting/Sorting";
import Loader from "../../Components/Templates/Loader/Loader";
import styles from "./PLP.module.scss";
import Sidebar from "../../Components/Organisms/Sidebar/Sidebar";
import AdBanner from "../../Components/Atom/AdBanner/AdBanner";
import Card from "../../Components/Organisms/Card/Card";
import AdCard from "../../Components/Organisms/AdCard/AdCard";

const PLP: React.FC = (): JSX.Element => {
  const { isLoading, error, pagination } = useAppSelector(
    (state) => state.products
  );
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const lastProductRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [offset, setOffset] = useState<number>(0); // Track current offset instead of currentPage
  const LIMIT = 10; // Define your LIMIT constant here
  const [pLimit, setLimit] = useState<numbeer>(10);

  // Fetch initial products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Fetch more products when sortBy or sortOrder changes
  useEffect(() => {
    dispatch(setSortCriteria({ sortBy, sortOrder }));
  }, [sortBy, sortOrder, dispatch]);

  // Intersection observer to load more products when reaching last product
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      console.log(offset);
      if (entries[0].isIntersecting && !isLoading) {
        dispatch(fetchMoreProducts(offset + LIMIT));
        setOffset((prevOffset) => prevOffset + LIMIT);
      }
    }, options);

    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    return () => {
      if (lastProductRef.current) {
        observer.unobserve(lastProductRef.current);
      }
    };
  }, [dispatch, isLoading, offset]);

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value);
  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`grid ${styles.plpWrapper}`}>
      <Sidebar />
      <main className={styles.mainContainer}>
        <AdBanner />
        <div
          className={`d-flex justify-content-end ${styles.sortingContainer}`}
        >
          <Sorting
            labelName={"Sort by"}
            sortName={sortBy}
            onChange={handleSortByChange}
            options={["price", "title"]}
          />
          <Sorting
            labelName={"Order"}
            sortName={sortOrder}
            onChange={handleSortOrderChange}
            options={["asc", "desc"]}
          />
        </div>

        <div className="grid grid-col-3 gap-3 xs:grid-col-2 xxs:grid-col-1 gap-3 xs:gap-1">
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <Card {...product} />
              {(index + 1) % 9 === 0 && <AdCard type="card" />}
              {index === filteredProducts.length - 1 && (
                <div ref={lastProductRef}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PLP;

// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import {
//   fetchMoreProducts,
//   getProducts,
//   setSortCriteria,
// } from "./ProductSlice";
// import { useAppSelector, useAppDispatch } from "../../Hooks/ReduxHooks";
// import selectFilteredProducts from "./Selector";
// import Sorting from "../../Components/Atom/Sorting/Sorting";
// import Loader from "../../Components/Templates/Loader/Loader";
// import styles from "./PLP.module.scss";
// import Sidebar from "../../Components/Organisms/Sidebar/Sidebar";
// import AdBanner from "../../Components/Atom/AdBanner/AdBanner";
// import Card from "../../Components/Organisms/Card/Card";
// import AdCard from "../../Components/Organisms/AdCard/AdCard";

// const PLP: React.FC = (): JSX.Element => {
//   const { isLoading, error, pagination } = useAppSelector(
//     (state) => state.products
//   );
//   const filteredProducts = useAppSelector(selectFilteredProducts);
//   const lastProductRef = useRef<HTMLDivElement | null>(null);
//   const dispatch = useAppDispatch();
//   const [sortBy, setSortBy] = useState<string>("price");
//   const [sortOrder, setSortOrder] = useState<string>("asc");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const handleScroll = () => {
//     // Detect if user has scrolled to the bottom of the page
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       // Fetch more products if there are more pages and not currently loading
//       if (pagination.currentPage < pagination.totalPages && !isLoading) {
//         dispatch(fetchMoreProducts(currentPage + 1));
//         setCurrentPage(currentPage + 1);
//       }
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [currentPage, pagination.totalPages, isLoading]);
//   // useEffect(() => {
//   //   console.log("calling");
//   //   const options = {
//   //     root: null,
//   //     rootMargin: "20px",
//   //     threshold: 0.5,
//   //   };

//   //   const observer = new IntersectionObserver((entries) => {
//   //     if (
//   //       entries[0].isIntersecting &&
//   //       pagination.currentPage < pagination.totalPages
//   //     ) {
//   //       const cPage = pagination.currentPage;
//   //       dispatch(fetchMoreProducts(cPage + 1));
//   //     }
//   //   }, options);

//   //   if (lastProductRef.current) {
//   //     observer.observe(lastProductRef.current);
//   //   }

//   //   return () => {
//   //     if (lastProductRef.current) {
//   //       observer.unobserve(lastProductRef.current);
//   //     }
//   //   };
//   // }, [dispatch, pagination]);
//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(setSortCriteria({ sortBy, sortOrder }));
//   }, [sortBy, sortOrder, dispatch]);

//   const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) =>
//     setSortBy(e.target.value);
//   const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) =>
//     setSortOrder(e.target.value);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return (
//     <div className={`grid ${styles.plpWrapper}`}>
//       <Sidebar />
//       <main className={styles.mainContainer}>
//         <AdBanner />
//         <div
//           className={`d-flex justify-content-end ${styles.sortingContainer}`}
//         >
//           <Sorting
//             labelName={"Sort by"}
//             sortName={sortBy}
//             onChange={handleSortByChange}
//             options={["price", "title"]}
//           />
//           <Sorting
//             labelName={"Order"}
//             sortName={sortOrder}
//             onChange={handleSortOrderChange}
//             options={["asc", "desc"]}
//           />
//         </div>

//         <div className="grid grid-col-3 gap-3 xs:grid-col-2 xxs:grid-col-1 gap-3 xs:gap-1">
//           {filteredProducts.map((product, index) => (
//             <>
//               <Card {...product} key={product.id} />
//               {(index + 1) % 9 === 0 && <AdCard type="card" />}
//             </>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };
// export default PLP;
