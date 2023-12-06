import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import { AuthContext } from "../hooks/authContext";
import { useContext } from "react";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, EyeIcon, TrashIcon, EditIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import UnAuthorized from "components/UnAuthorized/UnAuthorized";
import TitleChange from "components/Title/Title";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import { withRouter } from "react-router-dom";
import { url } from "config/urlConfig";
import axios from "../config/axiosConfig";

import Line_Chart from "global/recharts/Line_Chart";
import Area_Chart from "global/recharts/Area_Chart";

import { Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
// import useGrapAuth from "hooks/useRefresh";


function Dashboard(props) {
  const { authState, settings } = useContext(AuthContext);
  const [procurement, setProcurement] = useState([]);
  const [deadlineProjects,setDeadlineProjects] = useState([])
  const [projects, setProject] = useState([]);
  const [comments,setComments] = useState([])
  const [budgets,setBudgets] = useState([])
  const [tracks,setTracks] = useState([])
  const [dFiles,setDFiles] = useState([])
  const [vFiles,setVFiles] = useState([])
  const [oFiles,setOFiles] = useState([])
  const [pendingItem,setPendingItem] =useState([])
  const [checkedItem,setCheckedItem] =useState([])
  const [approvedItem,setApprovedItem] =useState([])
  const [pendingSoft,setPendingSoft] =useState([])
  const [checkedSoft,setChecedSoft] = useState([])
  const [approvedSoft,setApprovedSoft] = useState([])
  const [notApprovedOnes,setNotApprovedOnes] = useState([])
  const [countsData, setCountsData] = useState({
    projectCount: "",
    bidCount: "",
    activeProjects: "",
    completedProjects: "",
  });
  const [authorization, setAuthorization] = useState(false);
  // const refresh = useGrapAuth()
  // console.log('data from app',authState);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${url}/projects`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.error) {
            return
          }
          const sortedProjects = resp.data?.projects?.sort((a, b) => new Date(b.starttime) - new Date(a.starttime));
          // console.log(sortedProjects);
           const latestProjects = sortedProjects.slice(0, 5);
          setProject(latestProjects);
          // console.log('projects',resp.data.projects);
          const ddata = resp.data?.projects?.filter((pr)=>{
            const currentDate = new Date();
            const endTime = new Date(pr.endtime);
            return endTime.getTime() <= currentDate.getTime();
          })

          const nApproved = resp.data?.projects?.filter((pr)=>pr.approved===false)
          // console.log('The not',nApproved);
          setDeadlineProjects(ddata)
          setNotApprovedOnes(nApproved)
        })
        .catch((err) => {
         return
        });
    };

    const getCounts = async () => {
      await axios
        .get(`${url}/counts`, { withCredentials: true })
        .then((resp) => {
          const data = resp.data;
          setCountsData({
            projectCount: data.projectsCount,
            bidCount: data.countBids,
            activeProjects: data.activeProjectsCount,
            completedProjects: data.completedProjects,
          });
        });
    };


    const getComments = async () => {
      await axios
        .get(`${url}/comment`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.approved===0);
          setComments(data)
        });
    };


    const getBudgets = async () => {
      await axios
        .get(`${url}/budget`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.approved===false);
          // console.log(data);
          setBudgets(data)
        });
    };

    const getDesignFiles = async () => {
      await axios
        .get(`${url}/designFile`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.approved===false);
          // console.log(data);
          setDFiles(data)
        });
    };

    const getVariationFiles = async () => {
      await axios
        .get(`${url}/variationFile`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.approved===false);
          // console.log(data);
          setVFiles(data)
        });
    };


    const getOrderFiles = async () => {
      await axios
        .get(`${url}/orderFile`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.approved===false);
          // console.log(data);
          setOFiles(data)
        });
    };

    const getTracks = async () => {
      await axios
        .get(`${url}/budget/tracks`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data);
          if(resp.data.error) return
          const data = resp.data.filter((dt)=>dt.invoiced===0);
          // console.log(data);
          setTracks(data)
        });
    };


    const getProcurements = async()=>{
      await axios.get(`${url}/procurement`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
              return
          }else{
            const data = resp.data.filter((pr)=>{
              const currentDate = new Date();
              const endTime = new Date(pr.timeToSell);
              return endTime.getTime() <= currentDate.getTime();
            })
            setProcurement(data)
          }
      })
    }


    const getSoftProjects = async()=>{
      await axios.get(`${url}/softProject`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
              return
          }else{
            const p = resp.data.filter((sp)=>sp.status==="pending")
            const c = resp.data.filter((ch)=>ch.status==="checked")
            const a = resp.data.filter((ap)=>ap.status==="approved")
            setPendingSoft(p)
            setChecedSoft(c)
            setApprovedSoft(a)
            
          }
      })
    }



    const getSoftItems = async()=>{
      await axios.get(`${url}/softProjectItem`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
              return
          }else{
            const p = resp.data.filter((sp)=>sp.status==="pending")
            const c = resp.data.filter((ch)=>ch.status==="checked")
            const a = resp.data.filter((ap)=>ap.status==="approved")
            setPendingItem(p)
            setCheckedItem(c)
            setApprovedItem(a)
            
          }
      })
    }



    getSoftItems()
    getProcurements()
    getCounts();
    getData();
    getComments()
    getBudgets()
    getTracks()
    getDesignFiles()
    getVariationFiles()
    getOrderFiles()
    getSoftProjects()

    // console.log('favicon');
  }, []);



  const projectPercentileGraph = {
    data: {
      datasets: [
        {
          data: projects?.map((pr) => pr.physicalPerformance),
          backgroundColor: projects?.map((pr) => pr.color),
          label: "Percentage",
        },
      ],
      labels: projects?.map((pr) => pr.name),
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };

  // on page change, load new sliced data
  // here you would make another server request for new data



  return (
    <>
      <TitleChange name={`Dashboard | ${settings.name}`} />

        <>
          <PageTitle>Dashboard |  welcome {authState.username}</PageTitle>

          {/* <CTA /> */}

          {/* <!-- Cards --> */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard title="Total Projects " value={countsData.projectCount}>
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>

            <InfoCard title="Bids Registered" value={countsData.bidCount}>
              <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
              />
            </InfoCard>

            <InfoCard title="Active Projects" value={countsData.activeProjects}>
              <RoundIcon
                icon={CartIcon}
                iconColorClass="text-blue-500 dark:text-blue-100"
                bgColorClass="bg-blue-100 dark:bg-blue-500"
                className="mr-4"
              />
            </InfoCard>

            <InfoCard
              title="Completed Projects"
              value={countsData.completedProjects}
            >
              <RoundIcon
                icon={ChatIcon}
                iconColorClass="text-teal-500 dark:text-teal-100"
                bgColorClass="bg-teal-100 dark:bg-teal-500"
                className="mr-4"
              />
            </InfoCard>
          </div>

          <TableContainer>
            {/* Calendar section */}

            {/* end of calendar section */}
          </TableContainer>

          {authState.role==="manager"?
          <>
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Checked Soft-Projects(Training) That Need Approval.
              </p>
             
              <TableContainer className="mb-8">
              {checkedSoft?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>No.Trainers</TableCell>
                <TableCell>No.Trainees</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Refreshment</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {checkedSoft?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.trainersNo}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prc?.traineesNo}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.days}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">{prc?.refreshment}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softProjects/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            
            
            {/* items */}
            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Checked Soft-Projects(Items) That Need Approval.
              </p>
             
              <TableContainer className="mb-8">
              {checkedItem?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {checkedItem?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.quantity}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softItems/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            {/* end of items */}
            
            
            </>:""}


          {authState.role==="planningAdmin"?
          <>
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Soft-Projects(Training) That Need Checking.
              </p>
             
              <TableContainer className="mb-8">
              {pendingSoft?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>No.Trainers</TableCell>
                <TableCell>No.Trainees</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Refreshment</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {pendingSoft?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.trainersNo}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prc?.traineesNo}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.days}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">{prc?.refreshment}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softProjects/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            

             {/* items */}
             <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Soft-Projects(Items) That Need Checking.
              </p>
             
              <TableContainer className="mb-8">
              {pendingItem?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {pendingItem?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.quantity}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softItems/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            {/* end of items */}
            
            
            
            </>:""}


            {authState.role==="financeAdmin"?
            <>
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Approved Soft-Projects(Training) That Need To Be Done.
              </p>
             
              <TableContainer className="mb-8">
              {approvedSoft?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>No.Trainers</TableCell>
                <TableCell>No.Trainees</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Refreshment</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {approvedSoft?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.trainersNo}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prc?.traineesNo}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.days}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">{prc?.refreshment}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softProjects/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            
            

             {/* items */}
             <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Approved Soft-Projects(Items) That Need To Be Done.
              </p>
             
              <TableContainer className="mb-8">
              {approvedItem?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {approvedItem?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.quantity}</span>
                  </TableCell>

                    
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(prc?.total).toLocaleString()}</span>
                  </TableCell>

                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/softItems/${prc?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            {/* end of items */}
            
            
            
            </>:""}



          {authState.role==="planningAdmin"||authState.role==="planning"?
          <>
          
          {/* Comments Section */}
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Comments.
              </p>
             
              <TableContainer className="mb-8">
              {comments?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Comment</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {comments?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.comment}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prc?.date}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.user}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Not Approved</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${prc?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Comments Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>

            {/* End of Unapproved Projects Section */}

 {/* Unapproved Projects Section */}
 <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Projects That Need Approval.
              </p>
             
              <TableContainer className="mb-8">
              {notApprovedOnes?.length>0?
          <Table>
            <TableHeader>
              <tr>
              <TableCell>Name</TableCell>
                <TableCell>P.Cost</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {notApprovedOnes?.map((project, i) => (  
                <TableRow key={i} className="bg-red-200">
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{project.name}</p>
                    </div>
                  </div>
                </TableCell>
                
                
                <TableCell>
                  <span className="text-sm">ETB-{parseFloat(project.totalCost).toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.starttime}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{project.endtime}</span>
                </TableCell>
                
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/pglist/${project.id}`}>
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    </Link>
                  
                  </div>
                </TableCell>
              </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Projects Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>
            {/* End of Unapproved Projects Section */}
          </>:""
          }



          

          {authState.role==="financeAdmin"||authState.role==="finance"?
          <>
          {/* Budgets Section */}
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Budgets Need Approval.
              </p>
             
              <TableContainer className="mb-8">
              {budgets?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Year</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Allocated Budget</TableCell>
               
                <TableCell>Approved</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {budgets?.map((bd, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bd?.year}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{bd?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(bd?.allocatedBudget).toLocaleString()}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm"><Badge type="danger">Not Approved</Badge></span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${bd?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Budgets Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>

            {/* End of Budgets Section Section */}



             {/* Tracks Section */}
          <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Payments That Need To Be Invoiced.
              </p>
             
              <TableContainer className="mb-8">
              {tracks?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {tracks?.map((bd, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bd?.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{bd?.yearlyBudget?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">ETB-{parseFloat(bd?.utilized).toLocaleString()}</span>
                  </TableCell>
                  
                

                 
                  <TableCell>
                    <span className="text-sm"><Badge type="danger">Not Approved</Badge></span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${bd?.yearlyBudget?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Payments Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>

            {/* End of Tracks Section Section */}
            </>:""
          }


            {authState.role==="design"||authState.role==="designAdmin"? 
            <>         
            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Design Files.
              </p>
             
              <TableContainer className="mb-8">
              {dFiles?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>File</TableCell>
                <TableCell>CreatedBy</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {dFiles?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                  <p className="text-sm font-semibold">
                    <a href={`${prc?.file}`} target='_blank'>
                     <FaDownload className=''/>
                  </a>
                </p>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.createdBy}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Not Approved</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${prc?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4 dark:text-white">No Pending Files Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>


            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Variation Files.
              </p>
             
              <TableContainer className="mb-8">
              {vFiles?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>File</TableCell>
                <TableCell>CreatedBy</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {vFiles?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                  <p className="text-sm font-semibold">
                    <a href={`${prc?.file}`} target='_blank'>
                     <FaDownload className=''/>
                  </a>
                </p>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.createdBy}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Not Approved</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${prc?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4 dark:text-white">No Pending Files Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>



            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pending Order Files.
              </p>
             
              <TableContainer className="mb-8">
              {oFiles?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>File</TableCell>
                <TableCell>CreatedBy</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {oFiles?.map((prc, i) => (  
                <TableRow key={i} >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc?.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc?.Project?.name}</span>
                  </TableCell>
                  <TableCell>
                  <p className="text-sm font-semibold">
                    <a href={`${prc?.file}`} target='_blank'>
                     <FaDownload className=''/>
                  </a>
                </p>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc?.createdBy}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Not Approved</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${prc?.Project?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4 dark:text-white">No Pending Files Available</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

            </div>


            </>:""}




          <PageTitle>Projects</PageTitle>
    
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <ChartCard title="Project Percent Graph">
              <Doughnut {...projectPercentileGraph} />
              <ChartLegend legends={projects} />
            </ChartCard>

            <ChartCard title="Lines">
              <Line {...projectPercentileGraph} />
              <ChartLegend legends={projects} />
            </ChartCard>
          </div>


          <section className="grid gap-6 mb-8 md:grid-cols-2">
            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Projects surpassed their deadline.
              </p>


              <TableContainer className="mb-8">
              {deadlineProjects?.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>P.Cost</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
         
            <TableBody>
            {deadlineProjects?.map((project, i) => (  
                <TableRow key={i} className="bg-red-200">
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{project.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{project.totalCost}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{project.starttime}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{project.endtime}</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/pglist/${project.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
           
                
          </Table>
          :<span className="text-center mb-4 mt-4">No Deadlines</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>


            </div>

            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Procurements surpassed their  deadline.
              </p>
             
              <TableContainer className="mb-8">
              {procurement.length>0?
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Time To sell</TableCell>
                <TableCell>B.From</TableCell>
                <TableCell>Proc.Type</TableCell>
                <TableCell>Proc.Method</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          
            <TableBody>
            {procurement?.map((prc, i) => (  
                <TableRow key={i} className="bg-red-200">
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{prc.timeToSell}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{prc.budgetFrom}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{prc.procurementType}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{prc.procurementMethod}</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={`/app/procurement/${prc.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
              
                
          </Table>
             :<span className="text-center mb-4 mt-4">No Deadlines</span>}
          <TableFooter>
          </TableFooter>
        </TableContainer>

       
            

              {/* <OngoingProjects /> */}
            </div>
          </section>

         


  
        </>

    </>
  );
}

export default withRouter(Dashboard);
