import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './component/Pagination'
import { deletePost, fetchPosts, } from './component/userSlice';
import Card from './component/Card';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
      .then((response) => {
        console.log(response)
      })
  }, [dispatch])

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));

  };

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const displayedCards = data ? data.slice(startIndex, endIndex) : [];

  const totalPages = data ? Math.ceil(data.length / cardsPerPage) : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (

    <div className="App">
      {loading === 'loading' ? (
        <p>Loading...</p>
      ) : loading === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="card-container grid grid-cols-3">
            {displayedCards.map((post) => (
              <div className='m-4' key={post.id}>
                <Card className='grid grid-row-3'
                  key={post.id}
                  post={post}
                  onClick={() => handleDelete(post.id)}
                />
              </div>
            ))}
          </div>
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / cardsPerPage)}
            onPageClick={handlePageChange}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
