import React, {useEffect, useState} from "react";
import './app.css';

import SearchField from "../SearchField";
import Filter from "../Filter";
import Table from "../Table";
import Pagination from "../Pagination";
import InfoUser from "../InfoUser";

import Services from "../../services/services";

const App = () => {
    const services = new Services();

    const [dataUsers, setDataUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const [clickUserInfo, setClickUserInfo] = useState(true);
    const [filterCheck, setFilterCheck] = useState(false);
    const [filterData, setDataFilter] = useState([]);
    const [term, setTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const [currentUsers, setCurrentUsers] = useState([]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const viewProfileInfo = (profile) => {
        setClickUserInfo(false)
        dataUsers.forEach((elem) => {
            if(elem.key === profile) {
                setUserInfo(elem);
            }
        })
    }

    useEffect(() => {
        services.getData()
            .then((data) => {
                setDataUsers(data)
                setLoader(false);
            })
    })

    useEffect(() => {
        setCurrentUsers(dataUsers.slice(indexOfFirstUser, indexOfLastUser))
    }, [currentPage, indexOfFirstUser, indexOfLastUser])

    useEffect(() => {
        if(!loader) {
            setCurrentUsers(dataUsers.slice(indexOfFirstUser, indexOfLastUser))
        }
    }, [indexOfFirstUser, indexOfLastUser, loader])


    const sortById = (value) => {
        if(filterCheck) {
            if(value) {
                setFilterCheck(filterData.sort((a,b) => a.id - b.id));
            } else {
                setFilterCheck(filterData.sort((a,b) => b.id - a.id));
            }
        } else {
            if(value) {
                setCurrentUsers(currentUsers.sort((a,b) => a.id - b.id));
            } else {
               setCurrentUsers(currentUsers.sort((a,b) => b.id - a.id));
            }
        }
    }

    const sortData = (value, element) => {
        if(value) {
          setCurrentUsers(currentUsers.sort((a,b) => a[element].localeCompare(b[element])));
        } else {
           setCurrentUsers(currentUsers.sort((a,b) => b[element].localeCompare(a[element])));
        }
    }

    const sortDataFilter = (value ,element) => {
        if(value) {
            setFilterCheck(filterData.sort((a,b) => a[element].localeCompare(b[element])));
        } else {
            setFilterCheck(filterData.sort((a,b) => b[element].localeCompare(a[element])));
        }
    }

    const sortString = (value, string) => {
        switch (string) {
            case 'firstName':
                sortData(value, string);
                if(filterCheck) sortDataFilter(value,string);
                break;
            case 'lastName':
                sortData(value, string);
                if(filterCheck) sortDataFilter(value,string);
                break;
            case 'email':
                sortData(value, string);
                if(filterCheck) sortDataFilter(value,string);
                break;
            case 'phone':
                sortData(value, string);
                if(filterCheck) sortDataFilter(value,string);
                break;
            case 'state':
                if(value) {
                    setCurrentUsers(currentUsers.sort((a,b) => a.adress.state.localeCompare(b.adress.state)));
                } else {
                    setCurrentUsers(currentUsers.sort((a,b) => b.adress.state.localeCompare(a.adress.state)));
                }
                break;
            default:
                break;
        }
    }

    const filterState = (e) => {
        setFilterCheck(true);
        if(e.target.value === '') setFilterCheck(false);
        setDataFilter(currentUsers.filter((elem) => elem.adress.state === e.target.value));
    }

    const search = (e) => {
        setTerm(e.target.value.toLowerCase().trim());
    }


    return (
        <div className='app'>
            <div className='search-filter'>
                <SearchField search={search}/>
                <Filter filterState={filterState}/>
            </div>
            {loader ? <h1>Loading...</h1> : <Fragment data={filterCheck ? filterData : currentUsers}
                                                      viewProfileInfo={viewProfileInfo}
                                                      sortById={sortById}
                                                      sortString={sortString}
                                                      term={term}
                                                      usersPerPage={usersPerPage}
                                                      totalUsers={dataUsers.length}
                                                      paginate={paginate}
                                                      currentPage={currentPage}
                                                        />
            }
            {clickUserInfo ? <h1 className='click-user'>Сlick on the user</h1> : <InfoUser userInfo={userInfo}/>}
        </div>
    )
}

const Fragment = ({data, viewProfileInfo,
                      sortById, sortString,
                      term, usersPerPage,
                      totalUsers, paginate,
                      currentPage}) => {
    return (
        <React.Fragment >
            <Table data={data}
                   viewProfileInfo={viewProfileInfo}
                   sortById={sortById}
                   sortString={sortString}
                   term={term}
            />
            <Pagination  usersPerPage={usersPerPage}
                         totalUsers={totalUsers}
                         paginate={paginate}
                         currentPage={currentPage}/>
        </React.Fragment>
    )
}

export default App;