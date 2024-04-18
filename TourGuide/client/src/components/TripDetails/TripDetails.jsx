import { Link, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import styles from './TripDetails.module.css';
import { useNavigate } from "react-router-dom";

import * as tripService from '../../services/tripService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';

import { formatDate, commentTime } from '../../utils/dateUtil';
import { useAuthContext } from '../../contexts/AuthContext';
import { DeleteModal } from "../DeleteModal";
import { EditCommentModal } from "../EditCommentModal";
import { Loading } from "../Loading";


export const TripDetails = () => {

    const { tripId } = useParams();
    const { userId, isAuthenticated } = useAuthContext();
    const [detailsTrip, setDetailsTrip] = useState({});
    const [allLikes, setAllLikes] = useState([]);
    const [userLiked, setUserLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isDeleteCommentModal, setIsDeleteCommentModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        tripService.getOneTrip(tripId)
            .then(trip => {
                setDetailsTrip(trip);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(`Trip details GM ${err}`)
            })

    }, [tripId]);

    useEffect(() => {
        if (detailsTrip.owner) {
            likeService.allLikes()
                .then(likes => {
                    setAllLikes(likes);
                    const userLikedProfile = likes.some(like => like.user === userId && like.likedUser === detailsTrip.owner._id);
                    setUserLiked(userLikedProfile)
                })
                .catch(err => {
                    console.log(`Error fetching likes GM: ${err}`);
                })
        }
    }, [userId, detailsTrip.owner]);

    useEffect(() => {
        commentService.getComments(tripId)
            .then(commentsTrip => {
                setComments(commentsTrip)
            })
            .catch(err => {
                console.log('Comment Error GM', err);
            })
    }, [tripId]);

    const handleEditComment = (commentId, text) => {
        setEditingComment(commentId);
        setEditedText(text);
    }

    const handleConfirmEditComment = async (commentId, editedText) => {

        try {
            await commentService.editComment(commentId, userId, editedText);
            const updatedComments = await commentService.getComments(tripId);
            setComments(updatedComments);
            setEditingComment(null);
        } catch (error) {
            console.error('Error editing comment GM: ', error);
        }
    }

    const handleAddComment = async (event) => {
        event.preventDefault();

        try {
            await commentService.addComment(userId, tripId, newComment);

            const commentsData = await commentService.getComments(tripId);
            setComments(commentsData);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment GM:', error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        setCommentToDelete(commentId);
        setIsDeleteCommentModal(true);
    }

    const confirmDeleteComment = async (commentId) => {
        try {
            await commentService.deleteComment(commentId);
            const getAllCommentsData = await commentService.getComments(tripId);
            setComments(getAllCommentsData)
            setIsDeleteCommentModal(false);
        } catch (error) {
            console.log('Error deleting comment GM:', error);
        }
    }

    const onLike = async () => {
        await likeService.likeUser(userId, detailsTrip.owner._id)
            .then(() => {
                setAllLikes(prevLikes => {
                    const newLikes = [...prevLikes, { user: userId, likedUser: detailsTrip.owner._id }];
                    return newLikes;
                });
                setUserLiked(true);
            })
            .catch(err => {
                console.log('Error while liking the profile GM:', err);
            });

    }

    const onUnlike = async () => {
        try {
            await likeService.unlikeUser(userId, detailsTrip.owner._id);
            const updatedLikes = await likeService.allLikes();
            setAllLikes(updatedLikes);
            setUserLiked(false);
        } catch (err) {
            console.log('Error while unliking the profile GM:', err);
        }
    }

    const handleDelete = () => {
        setIsDeleteModal(true);
    }

    const handleCancelDelete = () => {
        setIsDeleteModal(false);
        setIsDeleteCommentModal(false);
    }

    const confirmDeleteTrip = () => {
        try {
            tripService.deleteTrip(tripId);
            setIsDeleteModal(false);
            navigate('/trip/create-trip');
        } catch (error) {
            console.log('Error deleting trip GM', error);
        }
    }

    return (
        <>
            {isLoading
                ? <Loading />
                : <section className={styles['trip-details']}>
                    <h3>Trip Details</h3>
                    <div className={styles.container}>
                        <div className={styles['trip-wrapper']}>

                            <div className={styles['trip-info']}>
                                <h5>Trip info</h5>
                                <div className={styles['trip-info-columns']}>
                                    <div className={styles.route}>
                                        <h6><i className="fa-solid fa-location-dot"></i><span>From:</span>{detailsTrip.cityOfDeparture}</h6>
                                        <p><i className="fa-solid fa-chevron-right"></i></p>
                                        <h6><i className="fa-solid fa-location-dot"></i><span>To:</span>{detailsTrip.cityOfArrival}</h6>
                                    </div>
                                    <div className={styles['date-time']}>
                                        <p><i className="fa-solid fa-calendar-days"></i><span>Date:</span>{formatDate(detailsTrip.dateOfTrip)}</p>
                                        <p><i className="fa-solid fa-gas-pump"></i><span>Price:</span>{detailsTrip.priceOfTrip}{detailsTrip.currency}</p>
                                    </div>
                                    <div className={styles['price-place']}>
                                        <p><i className="fa-solid fa-clock"></i><span>Clock:</span>{detailsTrip.departureTime}</p>
                                        <p><i className="fa-solid fa-moon"></i><span>Nights:</span>{detailsTrip.nights}</p>
                                    </div>


                                    {detailsTrip.owner?._id === userId ? (
                                        <div className={styles['trip-btn']}>
                                            <Link to={`/trip/edit-trip/${detailsTrip._id}`}><i className="fa-solid fa-square-pen"></i>Edit</Link>

                                            <Link onClick={handleDelete}><i className="fa-solid fa-trash"></i>Delete</Link>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles['car-info']}>
                                <h5>Car info</h5>
                                <div className={styles['car-info-columns']}>
                                    <div className={styles['left-car-info']}>
                                        <p><i className="fa-solid fa-car"></i><span>Price Of Trip:</span>{detailsTrip.priceOfTrip}</p>
                                        <p><i className="fa-solid fa-suitcase"></i><span>Luggage space (Kg):</span>{detailsTrip.luggageSpace}</p>
                                        <p><i className="fa-solid fa-snowflake"></i><span>Wi-Fi:</span>{detailsTrip.wiFi}</p>
                                        <p><i className="fa-solid fa-paw"></i><span>Power Outlets:</span>{detailsTrip.powerOutlets}</p>
                                        <p><i className="fa-solid fa-joint"></i><span>Leg Room:</span>{detailsTrip.legRoom}</p>
                                    </div>
                                    <div className={styles['right-car-info']}>
                                        <p><i className="fa-solid fa-car"></i><span>Bus Number:</span>{detailsTrip.busNumber}</p>
                                        <p><i className="fa-solid fa-moon"></i><span>Nights:</span>{detailsTrip.nights}</p>
                                        <p><i className="fa-solid fa-utensils"></i><span>Food:</span>{detailsTrip.food}</p>
                                        <p><i className="fa-solid fa-mug-hot"></i><span>Drinks:</span>{detailsTrip.drinks}</p>
                                        <p><i className="fa-solid fa-align-left"></i><span>Description:</span>{detailsTrip.description}</p>
                                    </div>
                                    <div className={styles['car-info-media']}>
                                        <img src={detailsTrip.tripImg} alt={`${detailsTrip.description}${detailsTrip.cityOfDeparture} Image`} />{/*?*/}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['driver-info']}>
                                <h5>Tour Guide info</h5>
                                <div className={styles['driver-info-columns']}>
                                    <div className={styles['trip-info-media']}>
                                        <img src={detailsTrip.owner?.profilePicture} alt={`${detailsTrip.owner?.firstName} Picture`} />
                                    </div>
                                    <div className={styles['trip-info-content']}>
                                        <ul>
                                            <li><span>First Name:</span>{detailsTrip.owner?.firstName}</li>
                                            <li><span>Last Name:</span>{detailsTrip.owner?.lastName}</li>
                                            <li><span>Username:</span>{detailsTrip.owner?.username}</li>
                                            {isAuthenticated
                                                ?
                                                <>
                                                    <li><span>Email:</span>{detailsTrip.owner?.email}</li>
                                                    <li><span>Phone:</span>{detailsTrip.owner?.phone}</li>
                                                </>
                                                :
                                                <>
                                                    <li><span>Email:</span>*********</li>
                                                    <li><span>Phone:</span>*********</li>
                                                </>
                                            }
                                        </ul>
                                    </div>

                                    <div className={styles['driver-btn']}>
                                        {detailsTrip.owner?._id === userId ? (
                                            <>
                                                <Link className={styles['details-edit-profile']} to={`/user/edit-profile/${detailsTrip.owner?._id}`}><i className="fa-solid fa-square-pen"></i>Edit</Link>
                                                {/* <Link className={styles['details-delete-profile']} onClick={handleDelete}><i className="fa-solid fa-trash"></i>Delete</Link> */}
                                            </>
                                        ) : null}
                                        {detailsTrip.owner?._id !== userId ? (
                                            <>
                                                {userLiked
                                                    ? <Link className={styles['unlike-btn']} onClick={onUnlike}><i className="fa-solid fa-thumbs-down"></i><span>{allLikes.filter(like => like.likedUser === detailsTrip.owner?._id).length}<span className={styles['like-text']}>Likes</span></span></Link>
                                                    : <Link className={styles['like-btn']} onClick={onLike}><i className="fa-solid fa-thumbs-up"></i><span>{allLikes.filter(like => like.likedUser === detailsTrip.owner?._id).length}<span className={styles['like-text']}>Likes</span></span></Link>
                                                }
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isAuthenticated
                            ? <div className={styles.comments}>
                                <h3>Comments:</h3>
                                {comments.length === 0
                                    ? <p>No comments yet</p>
                                    : <ul>
                                        {comments.map((comment) => (

                                            <li key={comment._id} className={styles.comment}>
                                                <div className={styles['comment-info']}>
                                                    <span className={styles['comment-username']}>{comment.user?.username}:</span>
                                                    {comment.text}
                                                    <span className={styles['comment-time']}>{commentTime(comment.createdAt)}
                                                        {comment.user?._id === userId &&
                                                            <>
                                                                <Link onClick={() => handleEditComment(comment._id, comment.text)}><span className={styles['edit-comment-pic']}><i className="fa-solid fa-pen-to-square"></i></span></Link>
                                                                <Link onClick={() => handleDeleteComment(comment._id)}><span className={styles['delete-comment-pic']}><i className="fa-solid fa-trash"></i></span></Link>
                                                            </>
                                                        }
                                                    </span>
                                                </div>
                                            </li>

                                        ))}
                                    </ul>
                                }
                                <div className={styles['create-comment']}>
                                    <label>Add new comment:</label>
                                    <form className={styles.form} onSubmit={handleAddComment}>
                                        <textarea
                                            name="comment"
                                            placeholder="Comment......"
                                            value={newComment}
                                            onChange={(event) => setNewComment(event.target.value)}
                                        ></textarea>
                                        <input className={styles['btn submit']} type="submit" value="Add Comment" />
                                    </form>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </section >
            }

            {editingComment && (
                <EditCommentModal
                    isOpen={true}
                    isCancel={() => setEditingComment(null)}
                    isConfirm={() => handleConfirmEditComment(editingComment, editedText)}
                    editedText={editedText}
                    setEditedText={setEditedText}
                />
            )}

            {isDeleteModal
                ? < DeleteModal isCancel={handleCancelDelete} isConfirm={confirmDeleteTrip} />
                : null
            }
            {isDeleteCommentModal
                ? < DeleteModal isCancel={handleCancelDelete} isConfirm={() => confirmDeleteComment(commentToDelete)} />
                : null
            }
        </>
    )
}