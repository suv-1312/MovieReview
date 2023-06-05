import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/user/Navbar';
import Home from './components/Home';
import Signin from './components/auth/Signin';
import SignUp from './components/auth/SignUp';
import EmailVerification from './components/auth/EmailVerification';
import PassWordConfirm from './components/auth/PasswordConfirm';
import PassWordForget from './components/auth/PasswordForget';
import NotFound from './components/NotFound';
import SingleMovie from './components/user/SingleMovie';
import MovieReviews from "./components/user/MovieReviews";
import SearchMovies from "./components/user/SearchMovies";
import AdminNavigator from './navigator/AdminNavigator';


import {useAuth} from './hooks';

export default function App(){

	const {authInfo} = useAuth();
	const isAdmin = authInfo.profile?.role === 'admin';
    
    if(isAdmin) return <AdminNavigator/>
	return (
		<>
			<Navbar/>
			<Routes> 
				<Route path ='/' element = {<Home/>}/>
				<Route path ='/auth/signin' element = {<Signin/>}/>
				<Route path ='/auth/signup' element = {<SignUp/>}/>

				<Route path ='/auth/verification' element = {<EmailVerification/>}/>
				<Route path ='/auth/reset-password' element = {<PassWordConfirm/>}/>
				<Route path ='/auth/forget-password' element = {<PassWordForget/>}/>
				<Route path="/movie/:movieId" element={<SingleMovie />} />
				<Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
				<Route path="/movie/search" element={<SearchMovies />} />

				<Route path ='*' element = {<NotFound/>}/>

				
			</Routes>
		</>
	);
}