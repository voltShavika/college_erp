import { createContext } from "react";

const CollegeContext = createContext({
    loginStatus: false,
    user: null,
    students: [],
    login: () => {},
    logout: () => {},
})

export default CollegeContext;