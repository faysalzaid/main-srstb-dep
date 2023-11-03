import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "components/Alert";  
import ReactQuill from "react-quill";
import "../../assets/css/requestPages.css";
import "../../assets/css/quill.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "../../pages/employeeList.css"
import ReactHtmlParser from 'react-html-parser';
// import "../../../node_modules/react-quill"
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,

} from "@windmill/react-ui";
import { EditIcon, EyeIconOne, TrashIcon } from "../../icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { url } from "../../config/urlConfig";
import * as Yup from "yup";

import { useContext } from "react";
import { AuthContext } from "../../hooks/authContext";
import useAuth from "hooks/useAuth";
import TitleChange from "components/Title/Title";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useParams } from "react-router-dom/cjs/react-router-dom";




function SoftProjectDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const {id} = useParams()

  // const [companyData,setCompanyData] = useState([])
  const [projectForm, setProjectForm] = useState({
    name:"",
    trainersNo: "",
    traineesNo: "",
    trainers: "",
    trainees: "",
    conferenceHall:"",
    stationary: "",
    refreshment: "",
    days: "",
  });


  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);
  const [showModal, setShowModal] = useState({show:false,id:""});
  const {authState,settings} = useAuth(AuthContext)
  const [projectData,setProjectData] = useState({})
  const [category,setCatogory] = useState([])


  useEffect(() => {
    const getData =async()=>{
      await axios.get(`${url}/softProject/${id}`,{withCredentials: true}).then((resp) => {
        if(resp.data.error){
        //   console.log(resp.data.error);
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
        // console.log(resp.data);
          setProjectData(resp.data);
          setProjectForm(resp.data)
  
        }
      });


    }

    getData()
    
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    if(projectForm.trainers==="" || projectForm.trainees ===undefined) return setOpenError({open:true,message:"Please Provide Trainers or Trainees List"})
    // console.log(projectForm);
    await axios.put(`${url}/softProject/${id}`, projectForm,{withCredentials:true}).then((resp) => {
      if (resp.data.error) {
        setOpenError({open:true,message:`${resp.data.error}`})
      } else {
        setProjectData(resp.data);
        setProjectForm(resp.data)
        closeModal();
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    });
  };

  const deleteBlog = async(ids) => {
    await axios.delete(`${url}/blog/${ids}`).then((resp) => {
      if (resp.data.error) {
        setOpenError({open:true,message:`${resp.data.error}`})
      }
      const newdata = projectData.filter((d) => d.id !== ids);
      setProjectData(newdata);
      closeModal();
      setShowModal({show:false,id:""})
      setOpenSuccess({open:true,message:"Successfully Deleted"})
    });
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? projectData : searchResult);
  }, [projectData, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newProjectData = projectData.filter((prj) => {
        return Object.values(prj)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newProjectData);
      setSearchResult(newProjectData);
    } else {
      setSearchResult(projectData);
    }
  };


  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

const handleCloseSuccess = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpenSuccess({ open: false, message: "" });
};

const [openError, setOpenError] = useState({ open: false, message: "" });

const handleCloseError = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpenError({ open: false, message: "" });
};





const [indexNumber, setIndexNumber] = useState(0);
const [step, setStep] = useState(1);
const [progress, setProgress] = useState(0);

const ShowNext = () => {
  setIndexNumber((indexNumber) => indexNumber + 100);
  setStep((setp) => setp + 1);
  setProgress((progress) => progress + 33.3);

};
const ShowPrev = () => {
  setIndexNumber((indexNumber) => indexNumber - 100);
  setStep((step) => step - 1);
  setProgress((progress) => progress - 33.3);
};




const handleTrainees = (e) => {
  setProjectForm({...projectForm,trainees:e})
  // console.log('This is e',e);
};

const handleTrainers = (e) => {
    setProjectForm({...projectForm,trainers:e})
    // console.log('This is e',e);
  };

  const [isCheckOpen,setIsCheckOpen] = useState({open:false,checkedComment:""})
  const [isApproveOpen,setIsApproveOpen] = useState({open:false,approvedComment:""})
  const [isDoneOpen,setIsDoneOpen] = useState({open:false})

  function closeCheck(){
        setIsCheckOpen({open:false,checkedComment:""})
  }
  function closeApprove(){
    setIsApproveOpen({open:false,approvedComment:""})
}

function closeDone(){
    setIsDoneOpen({open:false})
}

  const handleCheck=async(e)=>{
    e.preventDefault()
    // console.log('clicked');
    const request = {
        checkedComment:isCheckOpen.checkedComment
    }
    await axios.post(`${url}/softProject/check/${id}/`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setProjectData(resp.data)
        setOpenSuccess({open:true,message:"Successfully Checked"})
        closeCheck()
    })
  }

  const handleApprove=async(e)=>{
    e.preventDefault()
    // console.log('clicked');
    const request = {
        approvedComment:isApproveOpen.approvedComment
    }
    await axios.post(`${url}/softProject/approve/${id}/`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setProjectData(resp.data)
        setOpenSuccess({open:true,message:"Successfully Checked"})
        closeApprove()
    })
  }

  const handleDone=async(e)=>{
    e.preventDefault()
    // console.log('clicked');
    await axios.post(`${url}/softProject/done/${id}`,{},{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setProjectData(resp.data)
        setOpenSuccess({open:true,message:"Successfully Checked"})
        closeDone()
    })
  }

  return (
    <>
      <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />


        <Modal isOpen={isCheckOpen.open} onClose={closeCheck}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <form onSubmit={handleCheck}>
            <Label>
                    <span>Check Comment <span className="text-red-600 text-1xl">*</span></span>
                    <Textarea
                      type="text"
                      className="mt-1"
                      name="checkedComment"
                      autoComplete="off"
                      onChange={(e) =>
                        setIsCheckOpen({ ...isCheckOpen, checkedComment: e.target.value })
                      }
                      required
                    />
                    
                  </Label>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleCheck}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

      <Modal isOpen={isApproveOpen.open} onClose={closeApprove}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <form onSubmit={handleApprove}>
            <Label>
                    <span>Approve Comment <span className="text-red-600 text-1xl">*</span></span>
                    <Textarea
                      type="text"
                      className="mt-1"
                      name="checkedComment"
                      autoComplete="off"
                      onChange={(e) =>
                        setIsApproveOpen({ ...isApproveOpen, approvedComment: e.target.value })
                      }
                      required
                    />
                    
                  </Label>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleApprove}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

      <Modal isOpen={isDoneOpen.open} onClose={closeDone}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
          <p>Are you sure you want to Finish this Project?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleDone}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>




      
    <TitleChange name={`SoftProjects | ${settings.name}`} />
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <PageTitle>Detail | {projectData.name}</PageTitle>
         {/* Delete MOdal section  */}
         {showModal.show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete Confirm
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal({show:false,id:""})}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                   Are You sure you want to Delete This
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal({show:false,id:""})}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteBlog(showModal.id)}
                    style={{backgroundColor:'darkred'}}
                  >
                    Continue Deleting
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* End of Delete Modal Section */}


      {/* Search section */}
      <div className="mb-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              strokeWidth="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <Input
            type="search"
            id="default-search"
            value={searchTerm}
         
            onChange={(e) => searchHandler(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            // dark:border-gray-600 dark://placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Name, Role, Email..."
            required
          />
        </div>
      </div>
      {/* End of search List */}

      <p></p>
      {authState.role==='admin'||authState.role==="manager"||authState.role==="financeAdmin"||authState.role==="planningAdmin" ?
      <div>
         {projectData.status!=="done"?<Button size="small" onClick={openModal}>Update SoftProject</Button>:"This project is finished"}
        
      </div>
      :<p>Read Only</p>}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Project Info</ModalHeader>
        <ModalBody>
          <div className=" form_container w-full ">
            <section className=" progress_bar">
              <section
                className="progress"
                style={{ width: progress + "%" }}
              ></section>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 1
                    ? { background: "#7e3af2", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 1"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 2
                    ? { background: "#7e3af2", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 2"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 3
                    ? { background: "#7e3af2", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 3"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 4
                    ? { background: "#7e3af2", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 4"
              ></div>
            </section>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className=" insert_person_form"
              style={{ transform: "translateX(-" + indexNumber + "%)" }}
            >
              {/* section 1 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>Name <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="name"
                    //   placeholder="Empl Name"
                      autoComplete="off"
                      value={projectForm.name}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, name: e.target.value })
                      }
                      required
                    />
                    
                  </Label>

                  <Label>
                    <span>NoOfTrainers <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="number"
                      className="mt-1"
                      name="email"
                    //   placeholder="Empl Email"
                      autoComplete="off"
                      value={projectForm.trainersNo}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, trainersNo: e.target.value })
                      }
                      required
                    />
                  </Label>

                  <Label>
                    <span>NoOfTrainees <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="number"
                      className="mt-1"
                      name="phone"
                    //   placeholder="Empl Phone"
                      autoComplete="off"
                      value={projectForm.traineesNo}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, traineesNo: e.target.value })
                      }
                      required
                    />
                  </Label>


                </div>

                <div className=" flex justify-end gap-2">
                  <Button
                    type="button"
                    className="form_button dark:text-white text-gray-100"
                    onClick={ShowNext}
                  >
                    Next
                  </Button>
                </div>
                
              </section>

              {/* section 2 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label className="mt-1">
                    <span>ListOfTrainers <span className="text-red-600 text-1xl">*</span></span>
                    
                        <ReactQuill
                        placeholder="List of Trainers Here...."
                        className=" mb-6"
                        modules={SoftProjectDetail.modules}
                        value={projectForm.trainers}
                        onChange={handleTrainers}
                       
                        />
                  </Label>

                  
                </div>

                <div className=" flex justify-end gap-2">
                  <Button
                    type="button"
                    className=" form_button dark:text-white text-gray-100"
                    onClick={ShowPrev}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className=" form_button dark:text-white text-gray-100"
                    onClick={ShowNext}
                  >
                    Next
                  </Button>
                </div>
              </section>

              {/* section 3 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                <Label className="mt-1">
                    <span>Trainees <span className="text-red-600 text-1xl">*</span></span>
                    
                    <ReactQuill
                        placeholder="List of Trainees Here...."
                        className=" mb-6"
                        modules={SoftProjectDetail.modules}
                        value={projectForm.trainees}
                        onChange={handleTrainees}
                       
                        />
                  </Label>
                 
                </div>

                <div className=" flex justify-end gap-2">
                  <Button
                    type="button"
                    className=" form_button dark:text-white text-gray-100"
                    onClick={ShowPrev}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className=" form_button dark:text-white text-gray-100"
                    onClick={ShowNext}
                  >
                    Next
                  </Button>
                </div>
              </section>

              {/* section 4 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                <Label>
                    <span>ConferenceHall</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="ssn"
                    //   placeholder="Empl ssn"
                      autoComplete="off"
                      value={projectForm.conferenceHall}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, conferenceHall: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Stationary</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="passportNo"
                    //   placeholder="Empl passportNo"
                      autoComplete="off"
                      value={projectForm.stationary}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, stationary: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Refreshment <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="number"
                      step="0.01"
                      className="mt-1"
                      name="contactPhone"
                    //   placeholder="Empl contactPhone"
                      autoComplete="off"
                      value={projectForm.refreshment}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          refreshment: e.target.value,
                        })
                      }
                      required
                    />
                  </Label>

                  <Label>
                    <span>Days <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="number"
                      className="mt-1"
                      name="nationality"
                    //   value="Ethiopian"
                    //   placeholder="Empl nationality"
                      autoComplete="off"
                      value={projectForm.days}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          days: e.target.value,
                        })
                      }
                      required
                    />
                  </Label>
                </div>
                <div className=" flex justify-end gap-2">
                  <Button
                    type="button"
                    className=" form_button dark:text-white text-gray-100"
                    onClick={ShowPrev}
                  >
                    Previous
                  </Button>
                  <Button type="submit" className=" form_button dark:text-white text-gray-100">
                    Save
                  </Button>
                </div>
              </section>
            </form>
          </div>
        </ModalBody>
      </Modal>

    


  {/* Contract INformation */}
  <div className="container  my-8 p-9">
  <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">Project Detail</h1>
  {authState.role==="admin"||authState.role==="planningAdmin"?<div>
      {projectData.status==="pending" &&<Button size="small" style={{background:'green'}} onClick={()=>setIsCheckOpen({open:true})}>Check</Button>}
  </div>:''}
 {authState.role==="admin"||authState.role==="manager"? <div>
      {projectData.status==="checked" &&<Button size="small" style={{background:'blue'}} onClick={()=>setIsApproveOpen({open:true})}>Approve</Button>}
  </div>:""}
  {authState.role==="admin"||authState.role==="financeAdmin"?<div>
      {projectData.status==="approved" &&<Button size="small" style={{background:'green'}} onClick={()=>setIsDoneOpen({open:true})}>Done</Button>}
  </div>:""}
  <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
      <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Soft Project Information</h2>
      
      <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">Basic information about the Project.</p>
    </div>
    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-3">
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Name</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData.name}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">No.Trainers</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.trainersNo}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">No.Trainees</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.traineesNo}</dd>
        </div>
        
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Project Status</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100"> <Badge>{projectData?.status}</Badge></dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Refreshment</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">ETB {projectData?.refreshment?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Days</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.days} days</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Total</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">ETB {parseFloat(projectData?.total)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Checked Comment</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.checkedComment}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Approved Comment</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.approvedComment}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Rejected Comment</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{projectData?.rejectedComment}</dd>
        </div>
          <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Trainers</dt>
          <dd className="text-sm text-gray-900 dark:text-gray-100">{ReactHtmlParser(projectData?.trainers)}</dd>
        </div>
        <div>
          <dt className="mt-2 font-bold font-medium  dark:text-gray-100 text-1xl text-black-900">Trainees</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-100">{ReactHtmlParser(projectData.trainees)}</dd>
        </div>
        </dl>
      </div>
    </div>
  </div>
              


    {/* Contract information Section */}

    </>
  );
}


SoftProjectDetail.modules = {
  toolbar: [
    [{ header: ["3", false] }, { header: 1 }, { header: 2 }],
    ["bold", "italic", "underline", "strike"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  
    [{ color: [] }],
    ["clean"],
  ],
};






export default SoftProjectDetail;
