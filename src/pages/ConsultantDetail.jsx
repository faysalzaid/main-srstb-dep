import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import {FaBullseye,FaDownload,FaCloudUploadAlt} from 'react-icons/fa'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import axios from "../config/axiosConfig";
import { MdArrowForward } from "react-icons/md";
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
} from '@windmill/react-ui'
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'
import { bidUrl, url } from 'config/urlConfig'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TitleChange from 'components/Title/Title'

function ConsultantDetail(props) {
    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [bidsData,setBidData] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
    const [bidFormData,setBidFormData] = useState({
        fullname:"",phone:"",license:"",status:"",performa:"",
        proposal:"",companydoc:"",amount:"",
        consultantUserPic:"",ProjectId:"",UserId:"",
        score:"",description:"",evaluationFile:"",evaluationStatus:""
  
  })

    const [successMessage,setSuccessMessage] = useState("")
    const [projects,setProjects] = useState([])
    const [ users,setUsers] = useState([])
    const [showModal, setShowModal] = useState({show:false,id:""});
    const {authState,settings} = useContext(AuthContext)

    




    useEffect(()=>{
        const bidsFetch = async()=>{
            await axios.get(`${url}/consultants/${id}`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) setOpenError({open:true,message:`${resp.data.error}`});
              // console.log('from the main response',resp.data);
              setBidData(resp.data)
              setBidFormData({fullname:resp.data.fullname,
                phone:resp.data.phone,
                license:resp.data.license,
                status:resp.data.status,
                performa:resp.data.performa,
                proposal:resp.data.proposal,
                companydoc:resp.data.companydoc,
                consultantUserPic:resp.data.consultantUserPic,
                ProjectId:resp.data.ProjectId,
                description:resp.data.description,
                evaluationStatus:resp.data.evaluationStatus,
                evaluationFile:resp.data.evaluationFile
              
              })
            //   console.log('from bidformdata',bidFormData);
              
            }).catch((err)=>{
              // console.log(err.response);
            })

            await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                setErrorMessage(resp.data.error)
              }else{
    
                setProjects(resp.data.projects)}
              
            })
    
            await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                console.log(resp.data.error);
              }else{
                const data = resp.data.filter((usr)=>usr.role==='client')
                setUsers(data)
              }
            })
            // console.log(response.data);
        }
      


        bidsFetch()
      },[])
      


  const editBid =async(e)=>{
    e.preventDefault()
    
    if(bidFormData.fullname==="" || bidFormData.phone===""||bidFormData.license===""||bidFormData.status===""||bidFormData.performa===""||bidFormData.proposal===""||bidFormData.companydoc===""||bidFormData.amount===""||bidFormData.consultantUserPic===""||bidFormData.ProjectId===""||bidFormData.UserId===""){
      setErrorMessage('Please Provide all data')
    }else{
      const formData = new FormData()
      formData.append('fullname',bidFormData.fullname)
      formData.append('phone',bidFormData.phone)
      formData.append('license',bidFormData.license)
      formData.append('status',bidFormData.status)
      formData.append('performa',bidFormData.performa)
      formData.append('proposal',bidFormData.proposal)
      formData.append('companydoc',bidFormData.companydoc)
      formData.append('consultantUserPic',bidFormData.consultantUserPic)
      formData.append('ProjectId',bidFormData.ProjectId)
      formData.append('description',bidFormData.description)
      // console.log(formData);

        await axios.post(`${url}/consultants/${id}`,formData,{withCredentials:true}).then((resp)=>{
        // console.log('From resp.data',resp.data);
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`});
        }else{
           
            setBidData(resp.data)
            closeModal()
            setOpenSuccess({open:true,message:`Successfully Updated`});
            
        }
      }).catch((err)=>{
        // console.log(err);
      })
    }

}
        const deleteBid =async()=>{
          const response = await axios.delete(`${url}/consultants/${id}`,{withCredentials:true}).then((resp)=>{
            
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`});
            }else{
              setBidData("")  
              setShowModal({show:false,id:""})
              setOpenSuccess({open:true,message:`Successfully Deleted`});
              closeDelete()
              setTimeout(() => {
                props.history.goBack()
              }, 1000);

              // props.history.push('/app/companies')
            }
          })
        }

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




        const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

        const closeDelete = ()=>{
          setIsDeleteOpen({open:false,id:""})
        }
        const openDelete = (id)=>{
          setIsDeleteOpen({open:true,id:id})

        }



      const [evModel,setEvModal] = useState(false)
        function openEvModel() {
          setEvModal(true)
        }

        function closeEvModal() {
          setEvModal(false)
        }


        const onEvaluate =async(e)=>{
          e.preventDefault()
          const formData = new FormData()
          formData.append('evaluationStatus',bidFormData.evaluationStatus)
          // console.log(formData);
          await axios.post(`${url}/consultants/evaluate/${id}`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`})
            }else{
              setBidData(resp.data)
              setBidFormData({fullname:resp.data.fullname,
                phone:resp.data.phone,
                license:resp.data.license,
                status:resp.data.status,
                performa:resp.data.performa,
                proposal:resp.data.proposal,
                companydoc:resp.data.companydoc,
                consultantUserPic:resp.data.consultantUserPic,
                ProjectId:resp.data.ProjectId,
                description:resp.data.description,
                evaluationStatus:resp.data.evaluationStatus,
              
              })
              setOpenSuccess({open:true,message:'Successfully Evaluated'})
              closeEvModal()
            }
          }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                console.log(error.response.data.error);
                setOpenError({open:true,message:`${error.response.data.error}`})
              } else {
               setOpenError({open:true,message:"An Error Occured"})
              }
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


        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <PageTitle>Cosultant|{bidsData.fullname}</PageTitle>
        <TitleChange name={`Bid Detail |${settings.name}`}/>

                 {/* Delete MOdal section  */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteBid}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

          {/* End of Delete Modal Section */}
     
{/* Evalutation Modal */}
<Modal isOpen={evModel} onClose={closeEvModal}>
          <ModalHeader>Evaluate</ModalHeader>
          <ModalBody>
          <form onSubmit={onEvaluate} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4">
        
          <Label className="mt-4">
          <span>Evaluation Status</span>
          <Select className="mt-1" name="status" value={bidFormData.evaluationStatus} onChange={(e)=>setBidFormData({...bidFormData,evaluationStatus:e.target.value})}>
          <option>Select</option>
            <option>YES</option>
            <option>NO</option>
            
          </Select>
        </Label>
        <Button  type="submit" className="ml-auto px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-600">
              Evaluate
            </Button>
          </div>
      
          </form>
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
      </Modal>

            {/* End of Evaluation Modal */}


            {authState.role==="admin"||authState.role==="contractAdmin"||authState.role==="contract"||authState.role==="manager" ?
        <div className=''>
        
          <Button onClick={openModal}>Edit Consultant Info</Button>
         
          {bidsData.evaluationStatus==='YES'?
                <button className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded-xl h-8 flex items-center" onClick={()=>openEvModel()}>
                <span>Consultant Info is Evaluated</span>
                <MdArrowForward className="ml-1" size={20} />
              </button>
            :<button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-xl h-8 flex items-center" onClick={()=>openEvModel()}>
            <span>Evaluate Bid</span>
            <MdArrowForward className="ml-1" size={20} />
          </button>}

        </div>
         :<p>Read Only</p>}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={editBid} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
          <Label>
            <span>Fullname</span>
              <Input type="text" className="mt-1" name="fullname" placeholder="Full Name" value={bidFormData.fullname} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,fullname:e.target.value})}/>
          </Label>

        <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
              value={bidFormData.ProjectId}
              onChange={(e)=>setBidFormData({...bidFormData,ProjectId:e.target.value})}
              required
            >
              <option value="">Select a Project</option>
              {projects.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.name}</option>
              ))}
              
            </Select>
          </Label>
         
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone" value={bidFormData.phone} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,phone:e.target.value})}/>
          </Label>
    
          <Label>
            <span>License</span>
              <Input type="file" className="mt-1" name="license"   onChange={(e)=>setBidFormData({...bidFormData,license:e.target.files[0]})}/>
          </Label>

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={bidFormData.status} onChange={(e)=>setBidFormData({...bidFormData,status:e.target.value})}>
          <option>Select</option>
            <option>processing</option>
            <option>approved</option>
            <option>rejected</option>
            
          </Select>
        </Label>
        <Label>
            <span>Performa</span>
              <Input type="file" className="mt-1" name="performa"   onChange={(e)=>setBidFormData({...bidFormData,performa:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Proposal</span>
              <Input type="file" className="mt-1" name="proposal"   onChange={(e)=>setBidFormData({...bidFormData,proposal:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>CompanyDoc</span>
              <Input type="file" className="mt-1" name="companydoc"  onChange={(e)=>setBidFormData({...bidFormData,companydoc:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Bid Owner Pic</span>
              <Input type="file" className="mt-1" name="consultantUserPic" onChange={(e)=>setBidFormData({...bidFormData,consultantUserPic:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Description</span>
              <Textarea type="text" className="mt-1" name="description" value={bidFormData.description}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,description:e.target.value})}/>
          </Label><br />
        <Label className="mt-4">
          <Button type="submit">Save</Button>
        </Label>
        </div>
          </form>
              
     
          </ModalBody>
          <ModalFooter>

            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
           
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
  
        <SectionTitle></SectionTitle>
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Full Name</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Phone</TableCell>         
                <TableCell>Evaluated</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow key={bidsData.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bidsData.fullname}</p>
                        {/* <p className="text-xs text-gray-600 dark:text-gray-400">{bidsData.job}</p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                      {projects.map(pr => pr.id === bidsData.ProjectId ? (
                      <Link to={`/app/pglist/${pr.id}`} key={pr.id}>{pr.name}</Link>
                    ) : null)}
                 
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{bidsData.phone}</span>
                  </TableCell>
    

                <TableCell>
                  <Badge type={bidsData.evaluationStatus==="YES"?"success":"danger"}>{bidsData.evaluationStatus==="YES"?"Yes":"No"}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      
                      <Button onClick={()=>setIsDeleteOpen({open:true})}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
            
            </TableBody>
          </Table>
          <TableFooter>
          </TableFooter>
        </TableContainer>

          {/* Files section */}
          <div className=" flex flex-col gap-4 mt-0">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><a href={`${bidsData.license}`} target='_blank'>License</a></div>
              <button  className="text-red-500 hover:text-red-600">
              <a href={`${bidsData.license}`} target='_blank'>
                <FaDownload />
                </a>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><a href={`${bidsData.performa}`} target='_blank'>Performa</a></div>
              <button  className="text-red-500 hover:text-red-600">
              <a href={`${bidsData.performa}`} target='_blank'>
                <FaDownload />
                </a>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><a href={`${bidsData.proposal}`} target='_blank'>Proposal</a></div>
              <button  className="text-red-500 hover:text-red-600">
              <a href={`${bidsData.proposal}`} target='_blank'>
                <FaDownload />
                </a>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><a href={`${bidsData.companydoc}`} target='_blank'>Company Doc</a></div>
              <button  className="text-red-500 hover:text-red-600">
              <a href={`${bidsData.companydoc}`} target='_blank'>
                <FaDownload />
                </a>
                
              </button>
            </div>
        </div>
 {/* End of files section */}

{/* Evaluation section */}

            <div className="bg-white-200 items-center justify-center">
              <div className="bg-white rounded-md shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Evaluation Details</h2>
 
                <div className="mb-4 flex">
                  <p className="text-sm font-medium text-gray-600">Evaluation Status:</p>
                  {bidsData.evaluationStatus==='YES'?
                 <p className="text-sm font-semibold text-green-600">Evaluated</p>:  
                 <p className="text-sm font-semibold text-red-600">Not Evaluated</p>
                 }
            
                </div>
              </div>
            </div>
{/* End of evaluation section */}


       

      </>
     );
}

export default ConsultantDetail;