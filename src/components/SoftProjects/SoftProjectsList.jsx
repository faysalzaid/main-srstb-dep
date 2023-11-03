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




function SoftProjectList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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
  const [projectData,setProjectData] = useState([])
  const [category,setCatogory] = useState([])


  useEffect(() => {
    const getData =async()=>{
      await axios.get(`${url}/softProject`,{withCredentials: true}).then((resp) => {
        if(resp.data.error){
        //   console.log(resp.data.error);
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
         
          setProjectData(resp.data);
  
        }
      });


      await axios.get(`${url}/blogCategory`,{withCredentials: true}).then((resp) => {
        if(resp.data.error){
          console.log(resp.data.error);
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
         
          setCatogory(resp.data);
  
        }
      });


    }

    getData()
    
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    if(projectForm.trainers==="" || projectForm.trainees ===undefined) return setOpenError({open:true,message:"Please Provide Trainers or Trainees List"})
    // console.log(projectForm);
    await axios.post(`${url}/softProject`, projectForm,{withCredentials:true}).then((resp) => {
      if (resp.data.error) {
        setOpenError({open:true,message:`${resp.data.error}`})
      } else {
        setProjectData([...projectData, resp.data]);
        closeModal();
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    });
  };

  const handleDelete = async(ids) => {
    await axios.delete(`${url}/softProject/${ids}`,{withCredentials:true}).then((resp) => {
      if (resp.data.error) {
        return setOpenError({open:true,message:`${resp.data.error}`})
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
      
    <TitleChange name={`SoftProjects | ${settings.name}`} />
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <PageTitle>List of SoftProjects | Training</PageTitle>
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
                    onClick={() => handleDelete(showModal.id)}
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            // dark:border-gray-600 dark://placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Name, Role, Email..."
            required
          />
        </div>
      </div>
      {/* End of search List */}

      <p></p> //'admin', 'financeAdmin', 'manager', 'hr', 'planningAdmin', 'designAdmin', 'contractadmin', 'roadqualityAdmin'
      {authState.role==='admin'||authState.role==="manager"||authState.role==="designAdmin"||authState.role==="planningAdmin"||authState.role==="contractadmin"||authState.role==="roadqualityAdmin" ?
      <div>
        <Button size="small" onClick={openModal}>Create SoftProject</Button>
      </div>
      :<p>Read Only</p>}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Project Info</ModalHeader>
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
                        modules={SoftProjectList.modules}
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
                        modules={SoftProjectList.modules}
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

    

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>N.trainers</TableCell>
              <TableCell>N.trainees</TableCell>
              <TableCell>Refreshment</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult.map((pr, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{pr.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                    <p className="font-semibold">{pr.trainersNo}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{pr.traineesNo}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{pr.refreshment}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{pr.days}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <Badge className="font-semibold">{pr.status}</Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">ETB-{parseFloat(pr.total).toLocaleString()}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={{ pathname: `/app/softProjects/${pr.id}` }}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                      {authState.role==="planningAdmin"||authState.role==="admin"||authState.role==="financeAdmin"||authState.role==="manager"?
                      
                    <Button
                      onClick={() => setShowModal({show:true,id:pr.id})}
                      style={{ color: "red" }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                      :<Badge type="danger">UnAthorized</Badge>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
        </TableFooter>
      </TableContainer>
    </>
  );
}


SoftProjectList.modules = {
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






export default SoftProjectList;
