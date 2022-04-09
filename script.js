const btn = document.getElementById("btnn");
const inp = document.querySelector(".inp");

const getData = async function () {
    const response = await fetch(
        "https://www.scorebat.com/video-api/v3/feed/?token=[MTY0MzlfMTY0ODkxMzMwNV81YjgxNTA3OWEzMzNmN2VjYWFmM2VkMWUwYTU5Y2NmNGNmYjIzNWI3] "
    );
    const data = await response.json();
    return data.response;
};

const renderData = function (response) {
    $(".row")
        .append(`<div class="d-flex   justify-content-center m-2 bg-custom" style="width: 25rem">
        <div class="card-body ">
          <p class="card-text">${response.videos[0].embed}</p>
          <h5 class="card-head text-muted white">${response.title}</h5>
          <a  href="#" style="text-decoration: none"><h6 class="comp mb-2 text-warning">${
              response.competition
          }</h6></a>
          <h6 class="card-text mb-2 text-danger">${response.date.slice(
              0,
              10
          )}</h5>
        
        </div>`);
};

const loadPage = async function () {
    const matches = await getData();
    console.log(matches);

    for (const inf of matches) {
        if (inf.competition.includes) renderData(inf);
    }
};

loadPage();

const filterBySearch = async function () {
    const importName = await getData();
    inp.addEventListener("keyup", function (e) {
        const userTyped = e.target.value.toLowerCase();
        console.log(userTyped);
        const fltResult = importName.filter((team) => {
            return (
                team.title.toLowerCase().includes(userTyped) ||
                team.competition.toLowerCase().includes(userTyped)
            );
        });
        console.log(fltResult);
        $(".row").html(" ");
        for (const flt of fltResult) {
            renderData(flt);
        }
        filterByClick();
    });
};

const filterByClick = async function () {
    const clickFltr = await getData();
    $(".comp").on("click", function (e) {
        $(".row").html(" ");
        const fltcomp = e.target.innerText;
        const fltByComp = clickFltr.filter((comp) =>
            comp.competition.includes(fltcomp)
        );
        for (const flt of fltByComp) {
            renderData(flt);
        }
    });
};
filterByClick();
filterBySearch();
