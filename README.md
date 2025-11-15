
- create a vite + react application
- remove uncessary code and create a hello world app
- install tailwind css
- install daisy ui
- Add Navbar component to App.jsx
- create a Navabar.jsx separate component file
- routings :- npm i react-router-dom
- create BrowserRouter > Routes > Route=/Body > RouteChildren
- Create an Outlet in your Body component 
EX:- 
<BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>

      export const Body=()=>{

    return(
        <>
          <Navbar />
          <Outlet />
        </>
       )
   }

   - create a footer
   - cors - install cors in backend ==> add middleware to with configuration:  orgin:frontend path, credentails:true
   - when you're making API call so pass axios ==> {withCredentails:true}
   - If fetch call need metion ==> credentails:'include'
   - install redux toolkit ==>npm install @reduxjs/toolkit react-redux
   - configureStore => Provider => createSlice => add reducer => to store
   - add redux chrome extension
   - Login and see if your data is coming properly in the store
   - Navbar should update as soon as user logs in
   - Refactor our code to add constants file + create components folder
   - without login we can't access route
   - if token is empty we move login page
   - logout feacture\
   - get the feed and add in to the store.
   - build the user card on feed.
   - edit profile feacture
   - show toast when successfully edited profile.
   - New page - see all my connections
   - New page - to see all my requests
   - feacture - accept / reject connection request


   
   





   1.06