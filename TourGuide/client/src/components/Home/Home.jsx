import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";

import { getLastThreeTrips } from "../../services/tripService";
import { TripItem } from "../AllTrips/TripItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const result = await getLastThreeTrips();
        console.log(result);
        setTrips(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trips GM:", error);
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <section className={styles["site-home"]}>
      <div className={styles["card-container"]}>
        <div className={styles.container}>
          <h1>Welcome to the World of Tour Guiding!</h1>
          <p>Explore the world with our guided tours. Discover new places, cultures, and experiences.</p>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Slider {...settings}>
              {trips.map(trip => (
                <div key={trip._id}>
                  <TripItem trip={trip} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <section className={styles["site-home"]}>
        <div className={styles["card-container"]}>
          <div className={styles.container}>
            <h1>Tour Guide App</h1>
            <p>Set off on a journey that transcends the ordinary, where each destination offers a treasure trove of memories and unique experiences.</p>

            <div className={styles["card-list"]}>
              <div className={styles.card}>
                <span>
                  <i className={`${styles.icon1} fa-solid fa-map-marked-alt`}></i>
                </span>
                <h5>Discover</h5>
                <p>Browse through various tour options and pick your next adventure. From cities to natural wonders, find your perfect destination.</p>
              </div>
              <div className={styles.card}>
                <span>
                  <i className={`${styles.icon2} fa-solid fa-users`}></i>
                </span>
                <h5>Connect</h5>
                <p>Join a community of travelers. Share experiences, tips, and form friendships with people from around the globe.</p>
              </div>
              <div className={styles.card}>
                <span>
                  <i className={`${styles.icon3} fa-solid fa-star`}></i>
                </span>
                <h5>Experience</h5>
                <p>Enjoy curated tours led by local experts. Get the inside scoop on the must-see spots and hidden gems.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["how-work"]}>
          <div className={styles.container}>
            <h2>How does the app work?</h2>
            <div className={styles["number-list"]}>
              <div className={styles["card-number"]}>
                <p>
                  <span>1</span>
                </p>
                <h5>Choose Your Tour</h5>
                <p>Select from a wide range of tours based on your interests, budget, and schedule. Easily book your next adventure.</p>
              </div>
              <div className={styles["card-number"]}>
                <p>
                  <span>2</span>
                </p>
                <h5>Meet Your Guide</h5>
                <p>Connect with your local guide through the app. Get ready for an authentic and personalized touring experience.</p>
              </div>
              <div className={styles["card-number"]}>
                <p>
                  <span>3</span>
                </p>
                <h5>Enjoy Your Journey</h5>
                <p>Experience the culture, history, and beauty of your destination with the help of your knowledgeable guide.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["top-liked-users"]}>
          <div className={styles.container}>
            <h3>Top Guides</h3>
            <div className={styles["user-card"]}>
              <div className={styles["user-card-media"]}>
                <img src="https://i.pinimg.com/564x/cf/2e/68/cf2e68c7ad5591e86809e6c21183c913.jpg" alt="Guide Profile Pic" />
              </div>
              <div className={styles["user-card-content"]}>
                <h5>John Doe</h5>
                <p>Expert guide in European history and architecture. John has been leading tours in Paris for over 10 years, bringing the city's history to life.</p>
              </div>
            </div>
            <div className={styles["user-card"]}>
              <div className={styles["user-card-media"]}>
                <img src="https://i.pinimg.com/originals/57/f5/05/57f505024590eef73d60c22b90203be8.jpg" alt="Guide Profile Pic" />
              </div>
              <div className={styles["user-card-content"]}>
                <h5>Maria Fernandez</h5>
                <p>Maria specializes in culinary tours in Spain. Join her to explore the vibrant markets and taste the authentic flavors of Spanish cuisine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
