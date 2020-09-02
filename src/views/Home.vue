<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!--Create Action -->
    <h1> New Report</h1>
    <div>
      First & last Name: <input type="text" v-model="newUserName" />
      Description of issue or bright idea:<input type="text" v-model="newDescription"/>
      Screenshot: <input type="text" v-model="newScreenshot"/>
      Suggested Fix: <input type="text" v-model="newSuggestedFix"/>
      URL: <input type="text" v-model="newURL" />
      <button v-on:click="createReport()">Create Report</button>
    </div>
    <!--Index Action -->
    <h2>All The Reports</h2>
    <div v-for="report in reports">
      <p>User Name: {{report.name}} </p
      <p>Report Id: #{{report.id}}</p>
      <p>Description of issue: {{report.description}}</p>
      <img v-bind:src="report.screenshot" width="200px"/>
      <br>
      <!--Show Action -->
      <button v-on:click="showReport(report)">Show more...</button>
      <div v-if="currentReport === report">
        <p>Suggested Fix: {{report.suggested_fix}}</p>
        <p>URL: {{report.url}}</p>
        <p>Report Status: {{report.status}}</p>
      <!-- Update Action -->
        <div>
          Suggested Fix: <input type="text" v-model="report.suggested_fix" />
          <button v-on:click="updateReport(report)">Update Report</button>
        <!--destroy action -->
          <button v-on:click="destroyReport(report)"> Destroy Report </button>
        </div>
      </div>
      <p style="color:red">***</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Bug Report v1.2: A bug reporting tool built for the end user!",
      reports: [],
      currentReport: {},
      newUserName: "",
      newDescription: "",
      newScreenshot: "",
      newSuggestedFix: "",
      newURL: "",
    };
  },
  created: function () {
    axios.get("/api/reports").then((response) => {
      this.reports = response.data;
    });
  },

  methods: {
    createReport: function () {
      var params = {
        name: this.newUserName,
        description: this.newDescription,
        screeenshot: this.newScreenshot,
        suggested_fix: this.newSuggestedFix,
        URL: this.newURL,
      };
      axios.post("/api/reports", params).then((response) => {
        this.reports.push(response.data);
        this.newUserName = "";
        this.newDescription = "";
        this.newScreenshot = "";
        this.newSuggestedFix = "";
        this.newURL = "";
      });
    },
    showReport: function (report) {
      if (this.currentReport === report) {
        this.currentReport = {};
      } else {
        this.currentReport = report;
      }
    },
    updateReport: function (report) {
      var params = {
        suggested_fix: report.name,
      };
      axios.patch("/api/reports/" + report.id, params).then((response) => {
        this.currentReport = {};
      });
    },
    destroyReport: function (report) {
      axios.delete("api/reports/" + report.id).then((response) => {
        var index = this.reports.indexOf(report);
        this.reports.splice(index, 1);
      });
    },
  },
};
</script>
