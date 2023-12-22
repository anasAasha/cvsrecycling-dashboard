import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { MdRecycling } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../redux/actions/invoiceActions";

// import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaPrint } from "react-icons/fa";
const InvoiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.currentInvoice);
  const invoiceRef = useRef(null);
  useEffect(() => {
    dispatch(getInvoiceById(id));
  }, [dispatch, id]);

  if (!invoice) {
    // Handle loading or not found state
    return <p>Loading...</p>;
  }
  const generatePDF = () => {
    const content = invoiceRef.current;

    const pdfOptions = {
      margin: 10,
      filename: `${invoice.user.fullName} invoice #${id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' },
    };

    html2canvas(content, { scale: pdfOptions.html2canvas.scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", pdfOptions.image.quality);
      const pdf = new jsPDF(pdfOptions.jsPDF);
      
      pdf.addImage(imgData, 'JPEG', pdfOptions.margin, pdfOptions.margin, pdf.internal.pageSize.getWidth() - pdfOptions.margin * 2, pdf.internal.pageSize.getHeight() - pdfOptions.margin * 2);
      pdf.save(pdfOptions.filename);
    });
  };
  
  return (
    <div  >
  <div className="container mt-5"  ref={invoiceRef}>
      <div className="card" >
        <div className="m-5">
          <div className="card-body">
            <Row>
              <Col lg="6">
                <div>
                  <div
                    className="d-flex align-items-center fw-bold mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    <p></p>
                    <MdRecycling color="black" />
                    <span className="ms-2">CVS</span>
                    <span
                      className="ms-2 "
                      style={{
                        fontSize: "2rem",
                        letterSpacing: "-1px",
                        display: "inline-block",
                        fontWeight: "normal",
                      }}
                    >
                      Recycling
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="mb-2">CVS Recycling - Cash VS Scrap</p>
                    <p className="mb-2">Call or Text (513) 402-2811</p>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="mt-4 d-flex ">
                  <h4 className="fs-5 me-2 fw-bold">Invoice Date:</h4>
                  <p>
                    {new Date(invoice.date).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className=" d-flex  ">
                  <h4 className="fs-5 me-2 fw-bold ">Cust. no. :</h4>
                  <p>{invoice.cust_no}</p>
                </div>
                <div className="d-flex border border-1 rounded p-3">
                  <p className="fs-5 me-2 fw-bold">Time In:</p>
                  <p className="border-end pe-2">{invoice.time_in}</p>
                  <h4 className="fs-5 ms-2 me-2 fw-bold">Time Out:</h4>
                  <p>{invoice.time_out}</p>
                </div>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="row">
              <div className="col-md-6">
                <div className="d-flex mb-3 align-items-center ">
                  <h4 className="fs-5 me-2 fw-bold text-muted">Name:</h4>
                  <p className="mb-0">{invoice.user.fullName}</p>
                </div>
                {/* <div className="d-flex mb-3 align-items-center  ">
                  <h4 className="fs-5 me-2 fw-bold  text-muted">Address:</h4>
                  <p className="mb-0"> </p>
                </div> */}
                <div className="d-flex mb-3 align-items-center">
                  <h4 className="fs-5 me-2 fw-bold text-muted ">Shop Name:</h4>
                  <p className="mb-0">{invoice.user.shopName}</p>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <h4 className="fs-5 me-2 fw-bold text-muted ">Phone No:</h4>
                  <p className="mb-0">{invoice.user.phoneNo}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h5 className="font-size-15">Order summary</h5>
              <Row>
                <Col lg="8">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "70px" }}>No.</th>
                          <th>Item</th>
                          <th>Price</th>
                          <th className="text-right" style={{ width: "120px" }}>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>
                            <h5 className="font-size-15 mb-1">
                              {invoice.item_name}
                            </h5>
                            <p className="mb-0">Weight: {invoice.weight}</p>
                          </td>
                          <td>${invoice.price}</td>
                          <td className="text-right">${invoice.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Gross:</strong> {invoice.gross}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right">
                            <strong>tar:</strong> {invoice.tar}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right">
                            <strong>net:</strong> {invoice.net}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>

              <Col lg="12" className="mt-4 d-flex justify-content-end ">
                <div>
                  <div >
                    <h5 className="font-size-15 mb-1"></h5>
                    <p className="mb-0">#{invoice.id}</p>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    
    </div> 
     <div className="mt-3 container">
        <button className="btn btn-primary" onClick={generatePDF}>
        <FaPrint
        
          size={25}
          style={{ cursor: "pointer", marginRight:"10px" }}
        
        />
          Download PDF
        </button>
      </div>
    </div>
  
    
  );
};

export default InvoiceDetails;
