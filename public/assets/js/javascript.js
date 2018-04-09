$(document).ready(function() {
	// Scrape website for articles
	$("#scrape").click(function(e) {
		e.preventDefault();
		$.get("/api/scrape", function(data) {
			console.log("Data scraped");
		})
	});

	// Save article to be viewed seperately
	$(".saveArticle").click(function(e) {
		e.preventDefault();
		
		$.ajax({
			url: "/api/saveArticle",
			type: "PUT",
			data: { id: $(this).data("id") }
		})
		.then(function(data) {
			alert("Article saved!");
		})
		
	})

	// Brings up notes modal and populate with that article's
	// saved notes
	$(".viewNotes").click(function(e) {
		e.preventDefault();
		$("#saveNote").attr("data-id", $(this).data("id"));
		$("#notesList").empty();
		$.get(`/api/getNotes/${$(this).data("id")}`, function(data) {
			data.forEach(note => {
				const itemNote = $("<li class=list-group-item>");
				const deleteBtn = $(`<button 
					class="btn btn-danger delete-note" 
					style="float:right" 
					data-id='${note._id}'
					data-dismiss="modal">`);
				deleteBtn.text("X")
				itemNote.text(note.message);
				itemNote.append(deleteBtn);
				$("#notesList").append(itemNote);
			})
		})
		$("#notesModal").modal("show");

	})

	$("#saveNote").click(function(e) {
		e.preventDefault();
		const saveNoteData = {
			id: $(this).data("id"),
			title: $("#noteTitle").val(),
			message: $("#noteMessage").val()
		}

		$.post("/api/newNote", saveNoteData);
	})

	$(document).on("click", ".delete-note", function(e) {
		e.preventDefault();
		const thisID = $(this).data("id");
		$.ajax({
			url: `/api/removeNote/${$(this).data("id")}`,
			type: "DELETE"
		})
		.then(function(data) {
			console.log(data);
		})
	})

	// Remove article from saved list
	$(".removeArticle").click(function(e) {
		e.preventDefault();
		
		$.ajax({
			url: "/api/removeArticle",
			type: "PUT",
			data: { id: $(this).data("id") }
		})
		.then(function(data) {
			alert("Article removed.");
			location.reload();
		})
		
	})

})