import { ClipboardCheck, GraduationCap, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSideBar = () => {
	return (
    <div className="w-[14vw] min-h-screen border border-r-gray-200 px-4 py-6">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/universities-rating"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <GraduationCap size={20} />
            <span>Universitetlar reytinglari</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/universities"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <GraduationCap size={20} />
            <span>Universitetlar</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/colleges"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <GraduationCap size={20} />
            <span>Kasb-hunar kollejlari</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/t1-pending"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <ClipboardCheck size={20} />
            <span>T1 Tasdiqlash</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-indicators"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
							${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <GraduationCap size={20} />
            <span>Indicators</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar
