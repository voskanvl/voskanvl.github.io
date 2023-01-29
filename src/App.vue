<template>
    <Accordion :titles="titles">
        <template v-for="i in titles" v-slot:[i.name]>
            <component :is="i.component" />
        </template>
    </Accordion>
</template>

<script setup lang="ts">
    import Accordion from "./components/Accordion.vue";
    import Avatar from "./components/Avatar.vue";
    import Personal from "./components/Personal/Personal.vue";
    import Password from "./components/Password/Password.vue";

    const titles = [
        { name: "avatar", title: "Редактировать аватарку", component: Avatar },
        { name: "personal", title: "Персональные данные", component: Personal },
        { name: "password", title: "Пароль", component: Password },
    ];
</script>
