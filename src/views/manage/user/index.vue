<script setup lang="tsx">
import { ref } from 'vue';
import { useBoolean } from '@sa/hooks';
import OrgUnitTree from './modules/org-utils-tree.vue';
import UserPageTable from './modules/user-page-table.vue';

defineOptions({
  name: 'UserPage'
});

const { bool: userItemVisible } = useBoolean();

const orgUnitsData = ref<Api.SystemManage.OrgUnitsTree>({
  id: '0',
  code: '',
  name: '',
  children: []
});

/** org units handle select */
const handleSelect = (visible: boolean, item: Api.SystemManage.OrgUnitsTree) => {
  userItemVisible.value = visible;
  orgUnitsData.value = item;
};
</script>

<template>
  <div class="flex overflow-hidden">
    <NGrid :x-gap="8" :y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:5 l:5 xl:5 2xl:5" class="h-full-hidden">
      <NGridItem span="1" class="h-full-hidden"><OrgUnitTree @select="handleSelect" /></NGridItem>
      <NGridItem span="4">
        <UserPageTable v-if="userItemVisible" :org-units="orgUnitsData" />
        <NCard v-else :bordered="false" size="small" class="h-full">
          <NEmpty :description="$t('page.manage.user.selectTreeIsEmptyTip')" class="h-full justify-center" />
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style scoped></style>
