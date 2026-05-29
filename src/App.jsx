import React, { useMemo, useState } from "react";

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

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [banner, setBanner] = useState(false);
  const [bannerText, setBannerText] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Production");
  const [newSalary, setNewSalary] = useState("");

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

  const runDemoPayroll = () => {
    const depositedAmount = Math.round(totalPayroll * 0.35);
    setBannerText(
      `Deposit of ${money(
        depositedAmount
      )} processed to Jiro SURNAME HERE`
    );
    setBanner(true);

    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        status: "Paid",
      }))
    );

    window.setTimeout(() => {
      setBanner(false);
    }, 4500);
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

    setBannerText(
      "DEMO ONLY — New fictional employee record added to the payroll list"
    );
    setBanner(true);

    window.setTimeout(() => {
      setBanner(false);
    }, 3500);
  };

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
  <p>
    Payroll interface for managing employee records. Please process salary allocations to employee accounts and maintain the confidentiality of this information.
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
            <strong>Connected</strong>
          </div>
        </div>
      </aside>

      <main className="main">
        {banner && <div className="deposit-banner">{bannerText}</div>}

        <header className="topbar">
          <div>
            <p className="eyebrow">HDC company interface</p>
            <h1>HELLO MAEEE Payroll Control Center</h1>
            <p className="subtitle">
              Payroll Dashboard
            </p>
          </div>

          <button className="primary-button" onClick={runDemoPayroll}>
            Run Demo Payroll
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
                <strong>BYPASSED</strong>
              </div>
              <div className="summary-row">
                <span>Payment Gateway</span>
                <strong>Bank VISA</strong>
              </div>
            </div>

            <div className="callout">
              <h3>Banner Preview</h3>
              <p>
                Clicking <strong>Run Payroll</strong> applies the deposit
                to selected target
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
    </div>
  );
}