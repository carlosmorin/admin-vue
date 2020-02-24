<template>
    <div>
      <base-header type="gradient-success" class="pt-5 pt-md-8"></base-header>
      <div class="container-fluid mt--5">
          <div class="row">
              <div class="col">
                  <activity-logs-table></activity-logs-table>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import ActivityLogsTable  from './ActivityLogs/ActivityLogsTable'
  export default {
    name: 'activity-logs',
    components: {
      ActivityLogsTable
    }
  };
</script>
<style></style>
