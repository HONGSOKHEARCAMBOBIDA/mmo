<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserDataStore } from "../store/user_date";
import { useAuthStore } from "../store/auth.ts";
import router from "../router/index.ts";
import {
  House,
  User,
  TrendCharts,
  Setting,
  Wallet,
  Odometer,
  Lightning,
  OfficeBuilding
} from "@element-plus/icons-vue";
import AppButton from "../components/AppButton.vue";

const isSidebarOpen = ref<boolean>(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const userdataStore = useUserDataStore();
const auth = useAuthStore();





function handleCommand(cmd: string): void {
  if (cmd === "logout") {
    auth.logout();
    router.push("/login");
  }
}

onMounted(async () => {
  try {
    await userdataStore.getuserdata();
    console.log("User data:", userdataStore.userdata);
  } catch (e) {
    console.error("Error:", e);
  }
});
</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <!-- Sidebar -->
    <el-aside :width="isSidebarOpen ? '230px' : '0px'" class="sidebar">
      <div class="logo">
        <el-icon size="28"><OfficeBuilding /></el-icon>
        <span>
          {{ isSidebarOpen ? "គ្រប់គ្រងបន្ទប់ជួល" : "" }}
        </span>
      </div>

      <el-scrollbar>
        <el-menu default-active="1-1" :default-openeds="['1', '2', '3']" router>
          <!-- Dashboard -->
          <el-menu-item index="/dashboard">
            <el-icon><Odometer /></el-icon>
            <span>ផ្ទាំងគ្រប់គ្រង</span>
          </el-menu-item>

          <!-- Room Management -->
          <el-sub-menu index="1">
            <template #title>
              <el-icon><House /></el-icon>
              <span>គ្រប់គ្រងបន្ទប់</span>
            </template>

            <el-menu-item index="/Dashboard/Room">
              បញ្ជីបន្ទប់ជួល
            </el-menu-item>

            <el-menu-item index="/Dashboard/Floor"> បញ្ជីជាន់ </el-menu-item>

            <el-menu-item index="/Dashboard/Building">
              បញ្ជីអគ្គា
            </el-menu-item>
          </el-sub-menu>

          <!-- Tenant Management -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>គ្រប់គ្រងអ្នកជួល</span>
            </template>

            <el-menu-item index="/tenants"> បញ្ជីអ្នកជួល </el-menu-item>

            <el-menu-item index="/tenants/create"> បន្ថែមអ្នកជួល </el-menu-item>

            <el-menu-item index="/contracts"> កិច្ចសន្យាជួល </el-menu-item>
          </el-sub-menu>

          <!-- Payment Management -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Wallet /></el-icon>
              <span>គ្រប់គ្រងការទូទាត់</span>
            </template>

            <el-menu-item index="/payments"> ការបង់ថ្លៃជួល </el-menu-item>

            <el-menu-item index="/deposits"> ប្រាក់កក់ </el-menu-item>

            <el-menu-item index="/debts"> បំណុលអ្នកជួល </el-menu-item>
          </el-sub-menu>

          <!-- Utilities -->
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Lightning /></el-icon>
              <span>គ្រប់គ្រងថ្លៃសេវា</span>
            </template>

            <el-menu-item index="/utilities/water"> ថ្លៃទឹក </el-menu-item>

            <el-menu-item index="/utilities/electricity">
              ថ្លៃភ្លើង
            </el-menu-item>

            <el-menu-item index="/utilities/other">
              ថ្លៃសេវាផ្សេងៗ
            </el-menu-item>
          </el-sub-menu>

          <!-- Reports -->
          <el-sub-menu index="5">
            <template #title>
              <el-icon><TrendCharts /></el-icon>
              <span>របាយការណ៍</span>
            </template>

            <el-menu-item index="/reports/income">
              របាយការណ៍ចំណូល
            </el-menu-item>

            <el-menu-item index="/reports/rooms">
              របាយការណ៍បន្ទប់
            </el-menu-item>

            <el-menu-item index="/reports/tenants">
              របាយការណ៍អ្នកជួល
            </el-menu-item>
          </el-sub-menu>

          <!-- Settings -->
          <el-menu-item index="/settings">
            <el-icon><Setting /></el-icon>
            <span>ការកំណត់ប្រព័ន្ធ</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- Main Content -->
    <el-container>
      <!-- Header -->
      <el-header>
        <div class="header-left">
          <AppButton
            circle
            text
            :icon="isSidebarOpen ? 'Fold' : 'Expand'"
            @click="toggleSidebar"
          ></AppButton>
        </div>
        <div class="toolbar">
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              <el-icon><User /></el-icon>
              អ្នកគ្រប់គ្រង
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout" divided>
                  ចាកចេញ
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- Table -->
      <el-main>
        <div class="page-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
}
.layout-container-demo .el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.layout-container-demo .el-aside {
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  color: #1f2937;
  transition: width 0.3s ease;
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  font-weight: bold;
  font-size: 16px;
  color: #1f2937;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  background-color: #f5f7fa;
  padding: 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.page-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
