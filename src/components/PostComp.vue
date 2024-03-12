<template>
    <div class="mx-3 mt-4 bg-secondary-subtle rounded-4 shadow text-white overflow-hidden">
        <div class="media" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://i.ibb.co/qFSr6Zn/Chocolate-Muffins-4-pk-1.jpg);background-position: center;background-size: cover;">
            <div class="d-flex p-2">
                <div class="self-contact d-flex justify-content-center rounded-2">
                    <div class="profile_picture m-1 bg-secondary shadow rounded-4 p-4"></div>
                    <div class=" d-none d-lg-flex flex-column justify-content-evenly align-items-start">
                        <div class="text-truncate d-flex flex-column justify-content-evenly align-items-start">
                            <small class="mx-2 text-white">MrBud</small>
                            <small class="mx-2 text-white d-flex fw-light text-truncate"
                                style="font-size: x-small;">solocyberengineer@gmail.com</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-4"></div>
            <div class="py-4"></div>
            <div class="py-4"></div>
            <div class="p-2 bg-white text-dark d-flex flex-column align-items-start border-bottom border-1">
                <div class="tags text-secondary px-2">
                    <small class="m-2">#happynewyear</small>
                    <small class="m-2">#countdown</small>
                    <small class="m-2">#2024</small>
                </div>
                <small class="fw-normal mx-2 mt-4 mb-3">Just some generated text to test if this comment looks neat
                    enough to look legit.</small>
            </div>
            <div class="bg-white p-2 d-flex">
                <button class="btn btn-light text-secondary mx-1">
                    <span><i class="bi bi-hand-thumbs-up-fill"></i></span> <small>Like</small></button>
                <button class="btn btn-light text-secondary mx-1">
                    <span><i class="bi bi-chat-text-fill"></i></span> <small>Comment</small></button>
                <button class="btn btn-light text-secondary mx-1">
                    <span><i class="bi bi-share-fill"></i></span> <small>Share</small></button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PostComponent"
}
</script>