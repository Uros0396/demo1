{/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  DarkContextProvider } from './contexts/DarkContext.jsx'
import { ReviewsProvider } from './components/ReviewsContext/ReviewsContext.jsx'
import { PostReviewsProvider } from './components/PostReviewsContext/PostReviewsContext.jsx'
import  { SearchContextProvider } from './components/SearchContext.jsx'
createRoot(document.getElementById('root')).render(
<StrictMode>
  <ReviewsProvider>
    <DarkContextProvider>
      <PostReviewsProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </PostReviewsProvider>
    </DarkContextProvider>
    </ReviewsProvider>
</StrictMode>,
)*/}




import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DarkContextProvider } from './contexts/DarkContext.jsx';
import { ReviewsProvider } from './components/ReviewsContext/ReviewsContext.jsx';
import { PostReviewsProvider } from './components/PostReviewsContext/PostReviewsContext.jsx';
import { SearchContextProvider } from './components/SearchContext/SearchContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReviewsProvider>
      <DarkContextProvider>
        <PostReviewsProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </PostReviewsProvider>
      </DarkContextProvider>
    </ReviewsProvider>
  </StrictMode>
);
