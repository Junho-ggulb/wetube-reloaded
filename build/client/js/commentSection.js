"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var videoComments = document.querySelector(".video__comments ul");
var comments = videoComments.querySelectorAll("li");

var addComment = function addComment(text, newCommentId) {
  var newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;
  var icon = document.createElement("i");
  icon.className = "fas fa-comment";
  var span = document.createElement("span");
  span.innerText = " ".concat(text);
  var span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  span2.addEventListener("click", function () {
    handleDeleteComment(newComment);
  });
  videoComments.prepend(newComment);
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var textarea, text, id, response, _yield$response$json, newCommentId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            textarea = form.querySelector("textarea");
            text = textarea.value;
            id = videoContainer.dataset.id;

            if (!(text === "")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return fetch("/api/videos/".concat(id, "/comment"), {
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify({
                text: text
              })
            });

          case 8:
            response = _context.sent;
            _context.next = 11;
            return response.json();

          case 11:
            _yield$response$json = _context.sent;
            newCommentId = _yield$response$json.newCommentId;
            textarea.value = "";

            if (response.status === 201) {
              addComment(text, newCommentId);
            }

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (form) {
  form.addEventListener("submit", handleSubmit);
}

var handleDeleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(comment) {
    var id, commentId, _yield$fetch, status;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = videoContainer.dataset.id;
            commentId = comment.dataset.id;
            _context2.next = 4;
            return fetch("/api/videos/".concat(id, "/deleteComment/").concat(commentId), {
              method: "DELETE"
            });

          case 4:
            _yield$fetch = _context2.sent;
            status = _yield$fetch.status;

            if (status === 201) {
              comment.remove();
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDeleteComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

comments.forEach(function (comment) {
  var btn = comment.querySelector(".comment__delete-btn");
  btn.addEventListener("click", function () {
    handleDeleteComment(comment);
  });
});