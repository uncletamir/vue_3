<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Tambah Data Buku</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="kategori_id" class="font-weight-bold">Kode Buku</label>
                                <input type="text" class="form-control" v-model="buku.kategori_id" placeholder="Masukkan Kode Buku">
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kategori_id" class="font-weight-bold">K</label>
                                <input type="text" class="form-control" v-model="buku.kategori_id" placeholder="Masukkan Kode Buku">
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kategori_id" class="font-weight-bold">Kode Buku</label>
                                <input type="text" class="form-control" v-model="buku.kategori_id" placeholder="Masukkan Kode Buku">
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const post = reactive({
            title: '',
            content: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let title   = post.title
            let content = post.content

            axios.post('http://localhost:8000/api/post', {
                title: title,
                content: content
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'post.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            post,
            validation,
            router,
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>