<template>
    <main class="flex-fill container-fluid">
        <div class="row h-100">
            <div class="col-lg-6 d-flex flex-column justify-content-top align-items-center">
                <div class="d-flex flex-column mt-4">
                    <h4 class="display-4 fw-bold position-relative text-white d-flex flex-column">
                        Reach Me
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            Get in contact
                        </span>
                    </h4>
                </div>
            </div>
            <div class="col-3"></div>
            <div class="col-6 col-lg-12">
                <form class="bg-dark p-4 rounded-4 my-4" action="https://formspree.io/f/mqkvwprr" method="POST">
                    <div class="form-floating my-2">
                        <input v-model="name" name="name" id='name' type="text" class="form-control" placeholder="Name" required>
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating my-2">
                        <input v-model="email" name="email" id='email' type="text" class="form-control" placeholder="Email" required>
                        <label for="email">Email</label>
                    </div>
                        <textarea name="message" id='message' class="form-control" rows='8' placeholder="Enter your message" required></textarea>
                        <label for="message">Enter your message</label>
                        <button id="send" type="submit" @click="submitForm">Send</button><button id="clear" type="reset">Clear</button>
                </form>
           
            </div>
            <div class="col-3"></div>
        </div>
    </main>
</template>
<script>
import { sendRequest } from '@/service/UserAuth';

export default {
    methods: {
        async submitForm(event){
            event.preventDefault();

            await sendRequest(`https://formspree.io/f/mqkvwprr`, "POST", {})
        }
    }
}
</script>
<style scoped>
.description {
    font-size: small !important;
}


</style>
