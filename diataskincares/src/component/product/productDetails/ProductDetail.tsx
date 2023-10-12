import React , { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { ImEyePlus } from "react-icons/im";
import { TiCancel } from "react-icons/ti";
import { MdError } from "react-icons/md";
import styles from "./productDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  REMOVE_FROM_SAVED,
  SAVE_FOR_LATER,
  selectCartItems,
  selectSavedItems,
} from "../../../redux/slice/cartSlice";
// import useFetchDocuments from "../../../hooks/useFetchDocuments";
// import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../card/Card";
import CardSkeleton from "./CardSkeleton";

interface ProductDetailProps {} 



const ProductDetail: React.FC<ProductDetailProps> = () => {

    const { id } = useParams();
    const  [porduct, setProduct ] = useState<any>(null);
    const [ error, setError ] = useState<string>("");
    const dispatch = useDispatch();
    // const { document } = useFetchDocuments("Product", id);
    // const { data } = useFetchCollection("Reviews");
    const savedItems = useSelector(selectSavedItems);
    const quantityInCart = useSelector(selectCartItems);
    const navigate = useNavigate();

    useEffect(() => {
        
    })

    return (
        <section>
          <div className={`container ${styles.product}`}>
            <div>
              <p onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                &larr; Go back
              </p>
            </div>
            {product === null ? (
              <CardSkeleton />
            ) : (
              <div className={styles.details}>
                <div className={styles.img}>
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className={styles.content}>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>
                    {" "}
                    NGN {new Intl.NumberFormat().format(product.price)}
                  </p>
                  <p>{product.description}</p>
                  <p>
                    <b>SKU:</b> {product.id}
                  </p>
                  <p>
                    <b>Brand:</b> {product.brand}
                  </p>
                  <p>
                    <b>Number available in stock:</b> {product.count}
                  </p>
                  <p
                    className={
                      product.Availability === "Out of stock"
                        ? styles["out-of-stock"]
                        : styles["in-stock"]
                    }
                  >
                    <b className={styles.flex}>
                      {product.Availability === "Out of stock" ? (
                        <TiCancel size={20} />
                      ) : (
                        <BsFillCheckCircleFill />
                      )}
                      &nbsp; {product.Availability}
                    </b>
                  </p>
                  {error && (
                    <p className={`${styles.flex} ${styles.error}`}>
                      <MdError className={styles["error-icon"]} />
                      &nbsp; {error}
                    </p>
                  )}
                  <div className={styles["cart-buttons"]}>
                    <button
                      className="--btn --btn-danger "
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                    {savedItems.some((s: any) => s.id === product.id) ? (
                      <button
                        className={`--btn --btn-danger ${styles.later}`}
                        onClick={() => removeFromSaved(product)}
                        disabled
                        style={{ opacity: ".3", cursor: "not-allowed" }}
                      >
                        <BsFillCheckCircleFill />
                        &nbsp; PRODUCT SAVED
                      </button>
                    ) : (
                      <button
                        className={`--btn --btn-danger ${styles.later}`}
                        onClick={() => addToSaved(product)}
                      >
                        SAVE FOR LATER
                      </button>
                    )}
                  </div>
                  <Link to="/cart">
                    <ImEyePlus />
                    &nbsp; View cart
                  </Link>
                </div>
              </div>
            )}
            {product && (
              <Card cardClass={styles.card}>
                <h3>
                  {filteredReviews.length === 1 ? "Review" : "Reviews"}
                  <span style={{ fontSize: "1.6rem" }}>
                    &nbsp;({filteredReviews.length} total)
                  </span>
                </h3>
                <div>
                  {filteredReviews.length === 0 ? (
                    <p>There are no reviews for this product yet</p>
                  ) : (
                    <>
                      {product &&
                        filteredReviews?.map((customerReview: any, index: number) => {
                          const { rate, review, reviewDate, name } = customerReview;
                          return (
                            <div key={index} className={styles.review}>
                              <br />
                              <StarRatings
                                rating={rate}
                                starDimension="30px"
                                starRatedColor="gold"
                                starSpacing="3px"
                              />
                              <p>{review}</p>
                              <span>
                                <b>{reviewDate}</b>
                              </span>
                              <br />
                              <span>
                                <b>By: {name}</b>
                              </span>
                            </div>
                          );
                        })}
                    </>
                  )}
                </div>
              </Card>
            )}
            <br />
            {product ? (
              <span className={styles.add}>
                <BsInfoCircle size={13} />
                &nbsp; You can add reviews when you purchase a product.
              </span>
            ) : null}
          </div>
        </section>
      );
}
