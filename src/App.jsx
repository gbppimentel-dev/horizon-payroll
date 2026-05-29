import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

const initialEmployees = [
  {
    id: 1,
    name: "Marco SURNAME NI MARCO HERE",
    role: "IDK haha",
    department: "ewan lol",
    salary: 43000,
    status: "Paid",
  },
  {
    id: 2,
    name: "Jiro ???",
    role: "BEST BOI",
    department: "Payroll",
    salary: 35000,
    status: "Pending",
  },
  {
    id: 3,
    name: "Mae Balauro",
    role: "Scriptwriter HAHAHA",
    department: "Production",
    salary: 99999,
    status: "Paid",
  },
  {
    id: 4,
    name: "Bert Bert",
    role: "Tulog",
    department: "Sweetdreams",
    salary: 200,
    status: "Pending",
  },
];

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "min(520px, 100%)",
  background: "#efefef",
  border: "2px solid #7f7f7f",
  borderRadius: 0,
  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  padding: "18px",
  color: "#222",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  borderBottom: "1px solid #b0b0b0",
  paddingBottom: "12px",
  marginBottom: "14px",
};

const eyebrowStyle = {
  margin: "0 0 6px",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "#444",
  textTransform: "uppercase",
};

const closeButtonStyle = {
  width: "34px",
  height: "34px",
  border: "1px solid #7f7f7f",
  background: "#d7d7d7",
  color: "#111",
  borderRadius: 0,
  fontSize: "1.4rem",
  lineHeight: 1,
  cursor: "pointer",
  flexShrink: 0,
};

const messageStyle = {
  margin: "0 0 16px",
  color: "#333",
  lineHeight: 1.5,
};

const footerStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

function DemoModal({ open, title, message, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={cardStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        aria-describedby="demo-modal-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={headerStyle}>
          <div>
            <p style={eyebrowStyle}>NOTICE</p>
            <h3 id="demo-modal-title" style={{ margin: 0 }}>
              {title}
            </h3>
          </div>

          <button
            style={closeButtonStyle}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <p id="demo-modal-message" style={messageStyle}>
          {message}
        </p>

        <div style={footerStyle}>
          <button className="secondary-button" type="button" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function MobileBlocked() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#d7d7d7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#efefef",
          border: "2px solid #8a8a8a",
          padding: "28px",
          textAlign: "center",
          color: "#222",
        }}
      >
        <h1 style={{ margin: "0 0 16px" }}>Horizon Data Corp.</h1>
        <h2 style={{ margin: "0 0 12px", color: "#8B0000" }}>
          Unsupported Device
        </h2>
        <p style={{ margin: 0, lineHeight: 1.6, color: "#444" }}>
          This application is not supported on mobile devices.
          <br />
          Please open it on a desktop or laptop screen.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [banner, setBanner] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Production");
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPayroll = useMemo(
    () => employees.reduce((sum, emp) => sum + emp.salary, 0),
    [employees]
  );

  const paidCount = useMemo(
    () => employees.filter((emp) => emp.status === "Paid").length,
    [employees]
  );

  const pendingCount = employees.length - paidCount;

  const averageSalary = useMemo(() => {
    if (!employees.length) return 0;
    return Math.round(totalPayroll / employees.length);
  }, [employees.length, totalPayroll]);

  const openBanner = (title, message) => {
    setBanner({ open: true, title, message });
  };

  const closeBanner = () => {
    setBanner((prev) => ({ ...prev, open: false }));
  };

  const runDemoPayroll = () => {
    const depositedAmount = Math.round(totalPayroll * 0.35);

    openBanner(
      "Deposit Processed",
      <>
        Deposit of{" "}
        <strong style={{ color: "#008000" }}>{money(depositedAmount)}</strong>{" "}
        processed to{" "}
        <strong style={{ color: "#cc0000" }}>Jiro SURNAME HERE</strong>.
      </>
    );

    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        status: "Paid",
      }))
    );
  };

  const addDemoEmployee = (e) => {
    e.preventDefault();

    const salaryNumber = Number(newSalary);
    if (!newName.trim() || !newRole.trim() || !salaryNumber) return;

    const nextEmployee = {
      id: Date.now(),
      name: newName.trim(),
      role: newRole.trim(),
      department: newDept,
      salary: salaryNumber,
      status: "Pending",
    };

    setEmployees((prev) => [nextEmployee, ...prev]);
    setNewName("");
    setNewRole("");
    setNewDept("Production");
    setNewSalary("");

    openBanner(
      "Employee Record Added",
      "DEMO ONLY — New fictional employee record added to the payroll list."
    );
  };

  if (!isDesktop) {
    return <MobileBlocked />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">H</div>
          <div>
            <div className="brand-title">Horizon Data Corp.</div>
            <div className="brand-subtitle">Payroll System</div>
          </div>
        </div>

        <div className="sidebar-card warning-card">
          <div className="warning-title">Admin Access</div>
          <p className="justified-text">
            Payroll interface for managing employee records. Please process
            salary allocations to employee accounts and maintain the
            confidentiality of this information.
          </p>
        </div>

        <nav className="nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#employees">Employees</a>
          <a href="#runpayroll">Run Payroll</a>
          <a href="#activity">Activity</a>
        </nav>

        <div className="sidebar-card small-metrics">
          <div className="metric-line">
            <span>Pay cycle</span>
            <strong>Monthly</strong>
          </div>
          <div className="metric-line">
            <span>Status</span>
            <strong>LIVE Production</strong>
          </div>
          <div className="metric-line">
            <span>Bank Link</span>
            <strong style={{ color: "#006400" }}>Connected</strong>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">HDC company interface</p>
            <h1>HELLO MAEEE Payroll Control Center</h1>
            <p className="subtitle">Payroll Dashboard</p>
          </div>

          <button className="primary-button" onClick={runDemoPayroll}>
            Run Payroll
          </button>
        </header>

        <section className="stats" id="dashboard">
          <article className="stat-card">
            <span>Total Payroll</span>
            <strong>{money(totalPayroll)}</strong>
          </article>
          <article className="stat-card">
            <span>Paid Employees</span>
            <strong>{paidCount}</strong>
          </article>
          <article className="stat-card">
            <span>Pending Employees</span>
            <strong>{pendingCount}</strong>
          </article>
          <article className="stat-card">
            <span>Avg. Salary</span>
            <strong>{money(averageSalary)}</strong>
          </article>
        </section>

        <section className="panel-grid">
          <article className="panel" id="employees">
            <div className="panel-header">
              <div>
                <p className="panel-label">Employee directory</p>
                <h2>Company Staff</h2>
              </div>
              <span className="pill">Confidential Data</span>
            </div>

            <form className="form" onSubmit={addDemoEmployee}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div className="form-row">
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                >
                  <option>Production</option>
                  <option>Administration</option>
                  <option>Post Production</option>
                  <option>Operations</option>
                </select>
                <input
                  type="number"
                  placeholder="Monthly salary"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                />
              </div>

              <button className="secondary-button" type="submit">
                Add Employee
              </button>
            </form>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Dept.</th>
                    <th>Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.role}</td>
                      <td>{emp.department}</td>
                      <td>{money(emp.salary)}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            emp.status === "Paid" ? "paid" : "pending"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel" id="runpayroll">
            <div className="panel-header">
              <div>
                <p className="panel-label">Payout module</p>
                <h2>Payroll Summary</h2>
              </div>
              <span className="pill">Live on Production</span>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Next Payroll Date</span>
                <strong>Friday, 9:00 AM</strong>
              </div>

              <div className="summary-row">
                <span>Deposit Target</span>
                <strong>Jiro</strong>
              </div>

              <div className="summary-row">
                <span>Approval State</span>
                <strong style={{ color: "#8B0000" }}>BYPASSED</strong>
              </div>

              <div className="summary-row">
                <span>Payment Gateway</span>
                <img
                  src="/visa.svg"
                  alt="Visa"
                  style={{
                    height: "22px",
                    width: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>

            <div className="callout">
              <h3>Banner Preview</h3>
              <p>
                Clicking <strong>Run Payroll</strong> opens a reusable modal
                with the deposit notice.
              </p>
            </div>
          </article>
        </section>

        <section className="panel" id="activity">
          <div className="panel-header">
            <div>
              <p className="panel-label">Recent Activity</p>
              <h2>On-Screen Events</h2>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <span className="dot green" />
              <div>
                <strong>Payroll Batch prepared</strong>
                <p>Wage data staged for the next processing cycle.</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="dot yellow" />
              <div>
                <strong>Deposit Ready</strong>
                <p>Bank is enabled for immediate processing.</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="dot blue" />
              <div>
                <strong>Employee List Updated</strong>
                <p>New Staff Records are added from the form above.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoModal
        open={banner.open}
        title={banner.title}
        message={banner.message}
        onClose={closeBanner}
      />
    </div>
  );
}