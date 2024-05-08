import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import Header from 'components/Headers/Header';

const AppTables = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/appointments');
        setAppointments(response.data.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
  const handleApproveAppointment = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/appointments/${id}`, { status: 'scheduled' });
      if (response.data.status === 'success') {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: 'scheduled' } : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/appointments/${id}`, { status: 'cancelled' });
      if (response.data.status === 'success') {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: 'cancelled' } : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Appointments Schedule</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Service Id</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Billing invoice</th>
                    <th scope="col">Status</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Patient</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{appointment.serviceId}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{appointment.date} At {appointment.time}</td>
                      <td>{`$${appointment.payment.amount} USD`}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className={`bg-${appointment.status === 'pending' ? 'info' : appointment.status === 'scheduled' ? 'success' : 'danger'}`} />
                          {appointment.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <td>{appointment.doctorId}</td>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <td>{appointment.patientId}</td>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo" onClick={() => handleApproveAppointment(appointment._id)}>
                              Approve Appointment
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={() => handleCancelAppointment(appointment._id)}>
                              Cancel Appointment
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AppTables;
