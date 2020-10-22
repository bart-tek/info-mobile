const DEV_FEST_IMAGES_URL = "https://devfest2018.gdgnantes.com/";
const DEV_FEST_GET_URL = "https://devfest-nantes-2018-api.cleverapps.io/blog";

fetch(DEV_FEST_GET_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    .catch(function(err) {
        console.log(err);
    })


function appendData(json) {

    let mainContainer = document.getElementById("data");

    for (let i = 0; i < json.length; i++) {
        let card = document.createElement("ion-card");
        let img = document.createElement("img");
        img.src = DEV_FEST_IMAGES_URL + json[i].image;
        let cardHeader = document.createElement("ion-card-header");
        let cardTitle = document.createElement("ion-card-title");
        let cardContent = document.createElement("ion-card-content");
        cardTitle.innerHTML = json[i].title;
        cardContent.innerHTML = json[i].brief;
        cardHeader.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        mainContainer.appendChild(card);
    }

    loadAll();
}

async function takePhoto() {
    const img = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.Base64,
    });
    
    var imgBase64String = img.base64String;
    
    presentModal(imgBase64String);
}

customElements.define('modal-page', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <ion-header>
            <ion-toolbar>
                <ion-title>Création d'un article privé</ion-title>
                <ion-buttons slot="primary">
                <ion-button onClick="dismissModal()">
                    <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
                </ion-buttons>
            </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <form [formGroup]="userForm" padding-right>
                    <ion-item>
                        <ion-label position="floating">Titre</ion-label>
                        <ion-input id="title" type="text" required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Description</ion-label>
                        <ion-input id="desc" type="text"></ion-input>
                    </ion-item>
                
                    <ion-button 
                    color="primary" 
                    expand="block"
                    size="small"
                    [disabled]="!userForm.valid" 
                    onclick=save()>Enregistrer</ion-button>
                </form>
            </ion-content>`

            
    }
});

async function save() {

    const modalElement = document.querySelector('ion-modal');

    var title = await document.getElementById("title").getInputElement();
    var desc = await document.getElementById("desc").getInputElement();

    storeItem(title.value, modalElement.componentProps.pic, desc.value).then( () => {
        addCard(title.value).then( () => {
            dismissModal();
        });
    } );

}

async function addCard(title) {

    capacitorExports.Storage.get({'key':title}).then( (newCard) => {

        var item = JSON.parse(newCard.value);

        var titre = item.titre;
        var picture = item.img;
        var desc = item.description;
        
        let mainContainer = document.getElementById("data");
        let card = document.createElement("ion-card");
        let img = document.createElement("img");
        img.src = 'data:image/png;base64,' + picture;
        let cardHeader = document.createElement("ion-card-header");
        let cardTitle = document.createElement("ion-card-title");
        let cardContent = document.createElement("ion-card-content");
        cardTitle.innerHTML = titre;
        cardContent.innerHTML = desc;
        cardHeader.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        mainContainer.appendChild(card);
    });
    
}

async function loadAll() {
    let { keys } = await capacitorExports.Storage.keys();

    keys.forEach(key => {
        addCard(key);           
    });
}

function presentModal(pic) {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';

    modalElement.componentProps = {
        'pic': pic,
    };

    // present the modal
    document.body.appendChild(modalElement);

    return modalElement.present();
}

async function dismissModal() {
    await document.querySelector('ion-modal').dismiss({
      'dismissed': true
    });
}

async function storeItem(title, pic, desc) {
    await capacitorExports.Storage.set({
        'key': title,
        'value': JSON.stringify({
            'img': pic,
            'titre': title,
            'description':desc
        })
    })
}