import React, { useEffect, useState } from "react";
import styles from "./AllTrips.module.css";
import { Link } from "react-router-dom";

import * as tripService from "../../services/tripService";
import { TripItem } from "./TripItem";
import { Loading } from "../Loading";

export const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    tripService.getAllTrip().then(tripsResult => {
      setTrips(tripsResult);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    loadTrips();
  }, [currentPage, searchQuery]);

  const loadTrips = () => {
    setIsLoading(true);

    tripService
      .getAllTripWithSearch(searchQuery, currentPage)
      .then(tripsResults => {
        setTrips(tripsResults);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trips:", err);
        setIsLoading(false);
      });
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <section className={styles["all-trips"]}>
      <h3>Trips</h3>
      <div className={styles.container}>
        <div className={styles["search-field"]}>
          <input type="text" placeholder="Search trip..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
          <Link onClick={() => loadTrips()}>Search</Link>
        </div>
        <div className={styles["trip-list"]}>
          {isLoading ? <Loading /> : trips.map(trip => <TripItem key={trip._id} trip={trip} />)}
          {trips.length === 0 && <h1 className={styles["no-trips"]}>No trips yet</h1>}
        </div>
        <div className={styles["pagination-controls"]}>
          <button className={styles["previous-btn"]} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span className={styles["pagination-page"]}>{currentPage}</span>
          <button className={styles["next-btn"]} onClick={() => handlePageChange(currentPage + 1)} disabled={trips.length < 10}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
