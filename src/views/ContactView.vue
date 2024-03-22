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
            <div class="col-6">
                <form>
                    <div class="form-floating my-2">
                        <input id='name' type="text" class="form-control" placeholder="Name">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating my-2">
                        <input id='email' type="text" class="form-control" placeholder="Email">
                        <label for="email">Email</label>
                    </div>
                    <div class="form-floating my-2">
                        <textarea id='message' class="form-control" placeholder="Enter your message"></textarea>
                        <label for="message">Enter your message</label>
                    </div>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </main>
</template>
<script>
export default {

}
</script>
<style scoped>
.description {
    font-size: small !important;
}
</style>
