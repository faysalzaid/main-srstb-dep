import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "components/Typography/PageTitle";
import SectionTitle from "components/Typography/SectionTitle";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "components/Alert";
import "../../pages/employeeList.css";
import { EmplFileDownload } from '../../config/urlConfig'
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
import EditUser from "components/Users/EditUser";
import { useRef } from "react";
import AddEmployee from "components/Users/AddEmployee";
import { FaCloudUploadAlt,FaFileDownload } from "react-icons/fa";
import TitleChange from "components/Title/Title";
import { AuthContext } from "hooks/authContext";
import useAuth from "hooks/useAuth";

function RoadAssetList(props) {
  const { settings } = useAuth(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState({ open: false, props: {} });
  const [openAdd, setOpenAdd] = useState({ open: false, props: {} });
  const [uplModal, setUplModal] = useState(false);

  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });
  const [openError, setOpenError] = useState({ open: false, message: "" });

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess({ open: false, message: "" });
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError({ open: false, message: "" });
  };

  const handleCloseEdit = () => {
    setOpenEdit({ open: false, props: {} });
  };
  const handleCloseAdd = () => {
    setOpenAdd({ open: false, props: {} });
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIndexNumber(0);
    setStep(1);
    setProgress(0);
  }

  function openUploadModal() {
    setUplModal(true);
  }

  function closeUploadModal() {
    setUplModal(false);
  }

  // const [companyData,setCompanyData] = useState([])
  const [roadForm, setRoadFrom] = useState({
    origin: "",
    destination: "",
    length: "",
    design: "",
    width: "",
    pavementType: "",
    year: "",
    contractor: "",
    maintained: "",
    condition: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [roadData, setRoadData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);

  // const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      let isMounted = true;
      if (isMounted) {
        await axios
          .get(`${url}/roads`, { withCredentials: true })
          .then((resp) => {
            // console.log('Employees',resp.data);
            if (resp.data.error) {
              setErrorMessage(resp.data.error);
            } else {
              setRoadData(resp.data.road);
              // setIma
            }
          })
          .catch((error) => {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          });
       

      }
      return () => {
        isMounted = false;
      };
    };

    getData();
  }, []);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newEmployeeList = roadData.filter((empl) => {
        return Object.values(empl)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newEmployeeList);
      setSearchResult(newEmployeeList);
    } else {
      setSearchResult(roadData);
    }
  };



  const addEmployee = async (e) => {
    e.preventDefault();
      if(roadForm.origin===""||roadForm.destination===""||roadForm.length===""||roadForm.year===""||roadForm.condition==="") return setOpenError({open:true,message:"Please Provide Data with (*) red"})
      const formData = new FormData();
      console.log(roadForm);


      await axios
        .post(`${url}/roads`, roadForm, { withCredentials: true })
        .then((resp) => {
          // console.log('from server',resp.data);
          if (resp.data.error) {
            setOpenError({ open: true, message: `${resp.data.error}` });
          } else {
            setRoadData((prev) => [resp.data,...prev]);
            closeModal();
            setOpenSuccess({ open: true, message: "Successfully Added" });
          }
        })
        .catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })
    
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: "" });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id: id });
  };

  //
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setFetchedResult(searchTerm.length < 1 ? roadData : searchResult);
    }
    return () => {
      isMounted = false;
    };
    // console.log('runned fetched result');
  }, [roadData, searchTerm]);

  const deleteEmployee = async () => {
    await axios
      .delete(`${url}/roads/delete/${isDeleteOpen.id}`,{withCredentials:true})
      .then((resp) => {
        if (resp.data.error) {
          setErrorMessage(resp.data.error);
        }
        const newData = roadData.filter(
          (emp) => emp.id !== isDeleteOpen.id
        );
        setRoadData(newData);
        closeModal();
        // setSuccessMessage("Successfully Deleted");
        setOpenSuccess({ open: true, message: "Deleted Successfully" });
        closeDelete();
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    });
  };

  // Moving between form Sections start
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
  // Moving between form Sections end

  return (
    <>
      <TitleChange name={`Roads | ${settings.name}`} />
      {/* Delete Confirm section */}
      <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to perform this action?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={deleteEmployee}
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>

      {/* End of delete Section */}

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

      <PageTitle>The list of the Roads in the SRS Roads Network</PageTitle>
      <div>
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark://placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //placeholder="Search Mockups, Logos.
          />
        </div>
      </div>

      <div className="flex">
        <div className="mt-6">
          <Button onClick={() => openModal()}>Register Road</Button>
        </div>
        
      </div>

      {/* Add new employee form start */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Road Info</ModalHeader>
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
             
            </section>
            <form
              onSubmit={addEmployee}
              encType="multipart/form-data"
              className=" insert_person_form"
              style={{ transform: "translateX(-" + indexNumber + "%)" }}
            >
              {/* section 1 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>Origin <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="name"
                      //placeholder="Empl Name"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, origin: e.target.value })
                      }
                    />
                    
                  </Label>

                  <Label>
                    <span>Destination <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="email"
                      //placeholder="Empl Email"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, destination: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Length <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="number"
                      className="mt-1"
                      name="phone"
                      //placeholder="Empl Phone"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, length: e.target.value })
                      }
                    />
                  </Label>

                  <Label className="mt-1">
                    <span>Pavement Condition <span className="text-red-600 text-1xl">*</span></span>
                    <Select
                      className="mt-1"
                      name="status"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, condition: e.target.value })
                      }
                    >
                      <option value={''}>Select</option>
                      <option value={'poor'}>Poor</option>
                      <option value={'fair'}>Fair</option>
                      <option value={'good'}>Good</option>
                      <option value={'verygood'}>Very Good</option>
                    </Select>
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowNext}
                  >
                    Next
                  </button>
                </div>
              </section>

              {/* section 2 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                
                <Label>
                    <span>Design </span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="email"
                      //placeholder="Empl Email"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, design: e.target.value })
                      }
                    />
                  </Label>
              
                  <Label>
                    <span>Width </span>
                    <Input
                      type="number"
                      className="mt-1"
                      name="email"
                      //placeholder="Empl Email"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, width: e.target.value })
                      }
                    />
                  </Label>

                  
                  <Label>
                    <span>Pavement Type </span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="email"
                      //placeholder="Empl Email"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, pavementType: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Year of Construction  <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="Date"
                      className="mt-1"
                      name="year"
                      //placeholder="Empl Hired Date"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, year: e.target.value })
                      }
                    />
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowPrev}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowNext}
                  >
                    Next
                  </button>
                </div>
              </section>

              {/* section 3 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>Contractor</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="ssn"
                      //placeholder="Empl ssn"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, contractor: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Years Maintained</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="passportNo"
                      //placeholder="Empl passportNo"
                      autoComplete="off"
                      onChange={(e) =>
                        setRoadFrom({ ...roadForm, maintained: e.target.value })
                      }
                    />
                  </Label>


                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowPrev}
                  >
                    Previous
                  </button>
                  <button type="submit" className=" form_button">
                    Save
                  </button>
                </div>
              </section>

        

       
            </form>
          </div>
        </ModalBody>
      </Modal>
      {/* Add new Road form end */}

     
      <SectionTitle></SectionTitle>


      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Design Standard</TableCell>
              <TableCell>Carriage Width</TableCell>
              <TableCell>Pavement Type</TableCell>
              <TableCell>Year of Construction</TableCell>            
              <TableCell>Year Maintained</TableCell>
              <TableCell>Pavement Condition</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult&&fetchedResult?.map((rd, i) => (
              <TableRow key={i}>
                <TableCell>
                <span className="text-sm">{rd?.origin}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rd?.destination}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rd?.length}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {rd?.design}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rd?.width}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rd?.pavementType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rd?.year}</span>
                </TableCell>
             
                <TableCell>
                  <span className="text-sm">{rd?.maintained}</span>
                </TableCell>
                <TableCell>
                  <Badge type={rd?.status}>{rd?.condition}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/employees/${rd?.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => openDelete(rd.id)}
                      style={{ color: "red" }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
}

export default RoadAssetList;
