$(document).ready(function () {
  // Section Quote HomePage and Pricing
  function dataQuote() {
    let urlRequest = "https://smileschool-api.hbtn.info/quotes";
    let idParent = "#carousel-inner-quote";
    let wordInitial = "quote";
    let content = contentQuote;
    loadPage(content, urlRequest, idParent, wordInitial, (data = {}));
  }

  // Section Tutorial
  function dataTutorial() {
    let urlRequest = "https://smileschool-api.hbtn.info/popular-tutorials";
    let idParent = "#carousel-inner-tutorial";
    let wordInitial = "tutorial";
    let content = contentSection;
    loadPage(content, urlRequest, idParent, wordInitial, (data = {}));
  }

  // Section Latest
  function dataLatest() {
    let urlRequest = "https://smileschool-api.hbtn.info/latest-videos";
    let idParent = "#carousel-inner-latest";
    let wordInitial = "latest";
    let content = contentSection;
    loadPage(content, urlRequest, idParent, wordInitial, (data = {}));
  }

  // Update values of Filter section
  $("#inputKeyword").change(function () {
    dataResult();
  });

  $("#selectTopic").change(function () {
    dataResult();
  });

  $("#sortVideo").change(function () {
    dataResult();
  });

  // Section Results
  function dataResult() {
    let urlRequest = "https://smileschool-api.hbtn.info/courses";
    let idParent = "#data-result";
    let wordInitial = "result";
    let content = contentResult;
    let qVal = document.getElementById("inputKeyword").value;
    let topicVal = document.getElementById("selectTopic").value.toLowerCase();
    let s = document.getElementById("sortVideo").value;
    let sortVal = s.replace(" ", "_").toLowerCase();
    let data = { q: qVal, topic: topicVal, sort: sortVal };
    console.log(data);
    loadResult(content, urlRequest, idParent, wordInitial, data);
  }

  // Create content of slide
  function contentQuote(responseData, idQuote, wordInitial) {
    for (let i in responseData) {
      let classActive = "";
      if (i == 1) {
        classActive = "active";
      }
      $(`<div id="#carousel-item-${wordInitial}" class="quote-bg py-5 carousel-item carousel-item-${wordInitial} ${classActive}">
        <blockquote
          class="quote px-5 d-flex justify-content-center align-items-center"
        >
          <div class="row p-5" id="row-quote">
            <div class="col-md-4 col-lg-3 text-center">
              <img
                id="picture-quote"
                src="${responseData[i].pic_url}"
                class="image-quote rounded-circle"
                style="width: 160px; height: 160px"
              />
            </div>
            <div class="col-md-8 col-lg-9 py-3">
              <p class="text-quote text-white mt-2">
              ${responseData[i].text}
              </p>
              <p class="text-small-quote text-white mb-0">
                <span class="text-small-bold font-weight-bold"
                  >${responseData[i].name}</span
                >
                <br />
                <span class="font-italic">${responseData[i].title}</span>
              </p>
            </div>
          </div>
        </blockquote>
      </div>`).appendTo(idQuote);
    }
  }

  // Create score using a block of stars
  function createStar(responseData) {
    let numStar = responseData.star;
    let totalStar = 5;
    let blockStar = $(`<div id='score' class='score'></div>`);
    for (let i = 1; i <= totalStar; i++) {
      if (i <= numStar) {
        $(
          `<img class="img-score" src="images/star_on.png" alt="stars"/>`
        ).appendTo(blockStar);
      } else {
        $(
          `<img class="img-score" src="images/star_off.png" alt="stars"/>`
        ).appendTo(blockStar);
      }
    }
    return blockStar[0].outerHTML;
  }

  // Create content of each card
  function contentCard(responseData) {
    let stars = createStar(responseData);
    let score = responseData["sub-title"];
    let itemCard = `
    <div class="card mb-2 border border-0">
      <div class="card-img-top img-fluid d-flex justify-content-center align-items-center">
        <img
          class="img-top"
          src=${responseData.thumb_url}
          alt="Diagonal Smile"
        />
        <img class="img-play" src="images/play.png" alt="play" />
      </div>
      <div class="card-body-tutorial align-self-center">
        <h4 class="card-title-tutorial text-left font-weight-bold mt-3">
        ${responseData.title}
        </h4>
        <p class="card-text-tutorial text-left">
        ${score}
        </p>
        <div class="author d-flex flex-row justify-content-start">
          <img
            class="img-author"
            src=${responseData.author_pic_url}
            alt="Phillip Massey"
          />
          <p class="name-author ml-3 align-self-center mb-0">
          ${responseData.author}
          </p>
        </div>
        <div class="score-time mt-2 d-flex flex-row justify-content-between">
          ${stars}
          <p class="time">${responseData.duration}</p>
        </div>
      </div>
    </div>
    `;
    return itemCard;
  }

  //Create content of each section
  function contentSection(responseData, idParent, wordInitial) {
    for (let i in responseData) {
      let cardItem = contentCard(responseData[i]);
      let classActive = "";
      if (i == 1) {
        classActive = "active";
      }
      $(`<div id="carousel-item-${wordInitial}" class="carousel-item carousel-item-${wordInitial} ${classActive}">
          <div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
            ${cardItem}
          </div>
        </div>`).appendTo(idParent);
    }
    moveItem(idParent, wordInitial);
  }

  //Create content os result section
  function contentResult(responseData, idParent, wordInitial) {
    console.log(responseData);
    if (responseData.length == 1) {
      $("#num-videos").html(`${responseData.length} video`);
    } else {
      $("#num-videos").html(`${responseData.length} videos`);
    }
    const $dataResult = $("#data-result");
    $dataResult.empty();
    for (let i in responseData) {
      let cardItem = contentCard(responseData[i]);
      $(`<div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center flex-wrap">
            ${cardItem}
        </div>`).appendTo(idParent);
    }
  }

  // Get specific data
  function getData(callback, url, id, word, data) {
    $.ajax({
      url: url,
      data: data,
      type: "GET",
      dataType: "json",
      success: function (response, status) {
        if (status == "success") {
          console.log(response);
          if (id == "#data-result") {
            callback(response.courses, id, word);
          } else {
            callback(response, id, word);
          }
        }
      },
      error: function (error) {
        alert("Error");
      },
    });
  }

  //Load Results
  function loadResult(content, urlRequest, idParent, wordInitial, data) {
    let dataContent = document.getElementById(`content-${wordInitial}`);
    if (dataContent) {
      dataContent.className += " hidden";

      setTimeout(function () {
        document.getElementById(
          `load-${wordInitial}`
        ).className += ` load-${wordInitial} hidden`;

        getData(content, urlRequest, idParent, wordInitial, data);

        dataContent.className = dataContent.className.replace(/\bhidden\b/, "");
      }, 4000);
    }
  }

  //Load Quote, Tutorial
  function loadPage(content, urlRequest, idParent, wordInitial, data) {
    let carousel = document.getElementById(`carousel-${wordInitial}`);
    if (carousel) {
      carousel.className += " hidden";
      setTimeout(function () {
        document.getElementById(
          `load-${wordInitial}`
        ).className += ` load-${wordInitial} hidden`;

        getData(content, urlRequest, idParent, wordInitial, data);

        carousel.className = carousel.className.replace(/\bhidden\b/, "");
      }, 4000);
    }
  }

  function moveItem(idParent, wordInitial) {
    $(`.multi-item-carousel .carousel-item-${wordInitial}`).each(function () {
      let itemPerSlide = 4;
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }
      next.children(":first-child").clone().appendTo($(this));
      for (let i = 0; i < itemPerSlide; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(":first");
        }
        next.children(":first-child").clone().appendTo($(this));
      }
    });
  }

  dataQuote();
  dataTutorial();
  dataLatest();
  dataResult();
});
