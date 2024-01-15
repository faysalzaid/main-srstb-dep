import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Badge,
  TableContainer,
  Label,
  Select,
} from "@windmill/react-ui";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
  EditIcon,
} from "../../icons";
import { AiFillEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import { ErrorAlert, SuccessAlert } from "components/Alert";

function ConsultantSection({ bid, project, users, setBids, setProject }) {
  const [contracts, setContracts] = useState([]);
  const [bidSelect, setBidSelect] = useState({ open: false, id: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onBidSelect = () => {
    setBidSelect({ open: true });
  };

  const onBidClose = () => {
    setBidSelect({ open: false });
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

  return (
    <section className="contracts-section p-4 bg-white rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
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

      {/* Modal Payment section */}
      {/* <Modal isOpen={bidSelect.open} onClose={onBidClose}>
        <form onSubmit={handleSelection}>
          <ModalHeader>
            <span className="text-lg font-medium text-gray-700">
              Select Winner Bid
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <Label>
                <span>Status</span>
                <Select
                  className="mt-1"
                  name="status"
                  // value={formValues.status}
                  onChange={(e) =>
                    setBidSelect({ ...bidSelect, id: e.target.value })
                  }
                  required
                >
                  <option>Select a Status</option>
                  {bid.map((bi) => (
                    <option key={bi.id} value={bi.id}>
                      {bi.fullname}
                    </option>
                  ))}
                </Select>
              </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Select"}
            </Button>
          </ModalFooter>
        </form>
      </Modal> */}
      {/* Modal Payment section */}
      <PageTitle>
        Consultant Related Info
        {/* <Button className="ml-4" size="small" onClick={onBidSelect}>
          Select winner Bid
        </Button> */}
      </PageTitle>

      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
            <TableCell>Full Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>E.Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
    
              <TableRow key={project.consultant_user?.id}>
                <TableCell>
                  <div className="flex items-center text-sm ">
                    <div>
                      <p className="font-semibold">{project.consultant_user?.fullname}</p>
                    </div>
                  </div>
                </TableCell>
      
                <TableCell>
                  <span className="text-sm">{project.consultant_user?.phone}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    style={{
                      color: project.consultant_user?.evaluationStatus === "YES" ? "green" : "red",
                    }}
                  >
                    {project.consultant_user?.evaluationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/consultants/${project.consultant_user?.id}`}>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="View"
                        style={{ color: "red" }}
                      >
                        <AiFillEye className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
  
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default ConsultantSection;
