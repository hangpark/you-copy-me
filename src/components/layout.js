import './layout.scss'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col} from 'react-bootstrap'
import {FaPlusCircle, FaGithub} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Layout = ({main, brand, children}) => {
  return (
    <>
      <Navbar variant="dark" bg="primary">
        <Container>
          <Link to="/" component={NavbarBrand}>You Copy Me</Link>
          <Nav>
            {!main && (
              <NavItem>
                <Link to="/" component={NavLink}><FaPlusCircle/> Create a New</Link>
              </NavItem>
            )}
            <NavItem>
              <NavLink href="https://github.com/hangpark/you-copy-me"><FaGithub/> GitHub</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid={true} className="brand">
        <Container>
          <Row>
            <Col>
              <h1>You Copy Me</h1>
              {brand}
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="py-4 py-md-5">
        {children}
      </Container>
    </>
  )
}

export default Layout
