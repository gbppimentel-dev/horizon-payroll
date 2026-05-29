import React, { useMemo, useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Jordan Miles",
    role: "Audio Technician",
    department: "Production",
    salary: 4200,
    status: "Paid",
  },
  {
    id: 2,
    name: "Mia Carter",
    role: "Lighting Assistant",
    department: "Production",
    salary: 3850,
    status: "Pending",
  },
  {
    id: 3,
    name: "Ethan Brooks",
    role: "Camera Operator",
    department: "Production",
    salary: 5100,
    status: "Paid",
  },
  {
    id: 4,
    name: "Sarah Lin",
    role: "Studio Coordinator",
    department: "Administration",
    salary: 4600,
    status: "Pending",
  },
];

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
      `DEMO ONLY — Fictional deposit of ${money(
        depositedAmount
      )} processed to Horizon Crew Account`
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
            <div className="brand-title">Horizon</div>
            <div className="brand-subtitle">Payroll Demo</div>
          </div>
        </div>

        <div className="sidebar-card warning-card">
          <div className="warning-title">DEMO PROP ONLY</div>
          <p>
            Fictional payroll interface for filming. No real banking, no real
            payroll, no live accounts.
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
            <strong>Weekly</strong>
          </div>
          <div className="metric-line">
            <span>Status</span>
            <strong>Demo mode</strong>
          </div>
          <div className="metric-line">
            <span>Bank link</span>
            <strong>Disconnected</strong>
          </div>
        </div>
      </aside>

      <main className="main">
        {banner && <div className="deposit-banner">{bannerText}</div>}

        <header className="topbar">
          <div>
            <p className="eyebrow">Fictional company interface</p>
            <h1>Payroll Control Center</h1>
            <p className="subtitle">
              A polished, clearly fake dashboard for on-camera use.
            </p>
          </div>

          <button className="primary-button" onClick={runDemoPayroll}>
            Run Demo Payroll
          </button>
        </header>

        <section className="stats" id="dashboard">
          <article className="stat-card">
            <span>Total Demo Payroll</span>
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
                <h2>Fictional Staff</h2>
              </div>
              <span className="pill">Demo data</span>
            </div>

            <form className="form" onSubmit={addDemoEmployee}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Employee name"
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
                Add Demo Employee
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
              <span className="pill">Live on set</span>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Next payroll date</span>
                <strong>Friday, 9:00 AM</strong>
              </div>
              <div className="summary-row">
                <span>Deposit target</span>
                <strong>Horizon Crew Account</strong>
              </div>
              <div className="summary-row">
                <span>Approval state</span>
                <strong>Ready for demo</strong>
              </div>
              <div className="summary-row">
                <span>Payment gateway</span>
                <strong>Visual simulation only</strong>
              </div>
            </div>

            <div className="callout">
              <h3>Demo banner preview</h3>
              <p>
                Clicking <strong>Run Demo Payroll</strong> shows a fake deposit
                notice for filming purposes.
              </p>
            </div>
          </article>
        </section>

        <section className="panel" id="activity">
          <div className="panel-header">
            <div>
              <p className="panel-label">Recent activity</p>
              <h2>On-screen events</h2>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <span className="dot green" />
              <div>
                <strong>Payroll batch prepared</strong>
                <p>Demo wage data staged for the next fake processing cycle.</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="dot yellow" />
              <div>
                <strong>Deposit banner ready</strong>
                <p>Fictional notification is enabled for prop playback only.</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="dot blue" />
              <div>
                <strong>Employee list updated</strong>
                <p>New demo staff records can be added from the form above.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}