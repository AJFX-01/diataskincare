import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useFetchDocument } from "your-fetch-document-library"; // Import your fetch document library
import { useSelector } from "react-redux";
import { selectUserID } from "your-redux-selector"; // Import your Redux selector
import { addDoc, collection } from "your-firestore-functions"; // Import Firestore functions
import { Timestamp } from "your-firestore"; // Import Firestore Timestamp
import { toast } from "your-toast-library"; // Import your toast library
import StarsRating from "your-stars-rating-component"; // Import your StarsRating component
import Card from "your-card-component"; // Import your Card component
import styles from "./ReviewProducts.module.scss"; // Adjust the import path for your styles
import spinnerImg from "your-spinner-image-path"; // Adjust the import path for your spinner image

interface ReviewConfig {
  userID: string;
  name: string;
  productID: string;
  rate: number;
  review: string;
  reviewDate: string;
  createdAt: Date;
}

const ReviewProducts: React.FC = () => {
  const [rate, setRate] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null); // Adjust the type for the 'product' state
  const { id } = useParams();
  const { user } = useAuth();
  const { document } = useFetchDocument("Products", id); // Adjust the collection name
  const userID = useSelector(selectUserID);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rate === 0) {
      setError("Please give a star rating, star rating cannot be blank.");
      window.setTimeout(() => setError(""), 5000);
      return;
    }

    if (review === "") {
      setError(
        "You left the review blank, please enter something before submitting."
      );
      window.setTimeout(() => setError(""), 5000);
      return;
    }

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig: ReviewConfig = {
      userID,
      name: user.displayName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(database, "Reviews"), reviewConfig); // Adjust the collection name
      toast.success("Your review has been submitted, thank you.");
      setRate(0);
      setReview("");
      navigate("/order-history");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <div>
          <p onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
            &larr; Go back
          </p>
        </div>
        <h2>Rate This Product</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            {error && <p className="alert error">{error}</p>}
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              // required
              onChange={(e) => setReview(e.target.value)}
              cols={30}
              rows={10}
            ></textarea>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
