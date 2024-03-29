
<!DOCTYPE html>
<html>

<head>
	<title>COMBASE KORONA.pos Client API Demo</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<!-- Syntax highlighter-->
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/default.min.css"></link>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>

	<script src="http://codemirror.net/lib/codemirror.js"></script>
	<link rel="stylesheet" href="http://codemirror.net/lib/codemirror.css">
	<script src="http://codemirror.net/mode/javascript/javascript.js"></script>
	<script src="http://codemirror.net/addon/fold/foldcode.js"></script>
	<link rel="stylesheet" href="http://codemirror.net/addon/fold/foldgutter.css"></link>
	<script src="http://codemirror.net/addon/fold/foldgutter.js"></script>
	<script src="http://codemirror.net/addon/fold/brace-fold.js"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="webbrowser:jquery.min.js"></script>

	<!-- Bootstrap -->
	<link rel="stylesheet" href="webbrowser:bootstrap.min.css"></link>
	<link rel="stylesheet" href="webbrowser:bootstrap-theme.min.css"></link>
	<script type="text/javascript" src="webbrowser:bootstrap.min.js"></script>

	<!-- KORONA.pos-Client API module -->
	<script type="text/javascript" src="webbrowser:korona-plugin-api.js"></script>
	<link rel="stylesheet" href="webbrowser:koronaposclient.css"></link>

	<!-- Include for use in regular browser -->
	<script type="text/javascript" src="jquery.min.js"></script>
	<link rel="stylesheet" href="bootstrap.min.css"></link>
	<link rel="stylesheet" href="bootstrap-theme.min.css"></link>
	<script type="text/javascript" src="bootstrap.min.js"></script>
	<script type="text/javascript" src="korona-plugin-api.js"></script>
	<link rel="stylesheet" href="koronaposclient.css"></link>

	<style>
		code,
		kbd,
		pre,
		samp {
			font-family: monospace;
		}

		body {
			font-family: "Roboto", "Helvetica", "Arial", sans-serif;
		}

		input[type=checkbox]:focus
		{
		    outline: 1px solid rgba(0, 0, 0, 0.2);
		}

		input[type=checkbox]
		{
		    background-color: #DDDDDD;
		    border-radius: 2px;
		    appearance: none;
		    -webkit-appearance: none;
		    width: 17px;
		    height: 17px;
		    cursor: pointer;
		}

		input[type=checkbox]:checked
		{
		    background-color: #409FD6;
		    background: #409FD6 url("data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==") 3px 3px no-repeat;
		}

		.CodeMirror {
			height: auto;
		}

		.formatted-line {
			display: block;
			font-family: monospace;
			white-space: pre;
		}

		.BOLD {
			font-weight: bold;
		}

		.NORMAL {
			font-weight: normal;
		}

		.XS {
			font-size: 0.5em;
		}

		.S {
			font-size: 0.7em;
		}

		.M {
			font-size: 1em;
		}

		.L {
			font-size: 1.3em;
		}

		.XL {
			font-size: 1.5em;
		}

		.BLUE {
			color: white;
			background-color: #2196f3;
		}

		.CYAN {
			color: black;
			background-color: #00bcd4;
		}

		.GREEN {
			color: black;
			background-color: #4caf50;
		}

		.MAGENTA {
			color: white;
			background-color: #e91e63;
		}

		.NONE {
			color: black;
		}

		.ORANGE {
			color: black;
			background-color: #ff9800;
		}

		.RED {
			color: black;
			background-color: #f44336;
		}

		.YELLOW {
			color: black;
			background-color: #ffeb3b;
		}

	</style>

	<!-- JavaScript for this page -->
	<script type="text/javascript">

		window.onload = function myOnLoadFunc() {

			korona_plugin_api.response.modified(function myModifiedFunc() {
				var responseData = document.getElementById('responseData');

				if (getWindowLocationUrlValue('highlightjs') === 'true' || typeof CodeMirror === 'undefined') {

					responseData.innerHTML = '<pre><code>' + JSON.stringify(korona_plugin_api.response, null, "    ") + '</code></pre>';

					if (typeof hljs !== 'undefined')
						hljs.highlightBlock(responseData);

				} else {

					responseData.innerHTML = '<form><textarea id="responseDataCM">' + JSON.stringify(korona_plugin_api.response, null, "    ") + '</textarea></form>';

					var editor = CodeMirror.fromTextArea(document.getElementById("responseDataCM"), {
						mode: "application/json",
						readOnly: true,
						foldGutter: true,
						gutters: ["CodeMirror-foldgutter"],
						viewportMargin: Infinity
					});
				}

				fillActionsLists();
			});

			korona_plugin_api.ready(function myReadyFunc() {
				var requestData = document.getElementById('requestData');

				if (getWindowLocationUrlValue('highlightjs') === 'true' || typeof CodeMirror === 'undefined') {

					requestData.innerHTML = '<pre><code>' + JSON.stringify(korona_plugin_api.request, null, "    ") + '</code></pre>';
					if (typeof hljs !== 'undefined')
						hljs.highlightBlock(requestData);

				} else {

					requestData.innerHTML = '<form><textarea id="requestDataCM">' + JSON.stringify(korona_plugin_api.request, null, "    ") + '</textarea></form>';

					var editor = CodeMirror.fromTextArea(document.getElementById("requestDataCM"), {
						mode: "application/json",
						readOnly: true,
						foldGutter: true,
						gutters: ["CodeMirror-foldgutter"],
						viewportMargin: Infinity
					});
				}

				$('#requestDataCollapse').collapse('hide');

				korona_plugin_api.response.modified.notify();

				fillRequestLists();
			});

			// if you open this page in a standard browser ...
			if (korona_plugin_api.request === null) {
				// ... initialize the KORONA API with some demo data
				if (false) {
					korona_plugin_api.initFromJson('{"application":{"key":"Demo","version":"1.0"}}');
				} else {
					korona_plugin_api.initFromJson('{' +
						'"application":{"key":"Demo","version":"1.0"},' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"inputLine":"",' +
						'"organizationalUnit":{"name":"Store 1","number":"1"},' +
						'"pos":{"name":"PoS 3","number":"03"},' +
						'"receipt":{' +
						'"accountTransactions":[],' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"counter":0,' +
						'"creationTime":"2014-12-12T19:45:08.000+01:00",' +
						'"currency":{"isoCode":"EUR","name":"Euro","number":"1"},' +
						'"customerGroup":{"name":"Demo sector","number":"1"},' +
						'"modificationTime":"2014-12-16T19:12:11.144+01:00",' +
						'"number":"100563",' +
						'"organizationalUnit":{"name":"Demo store 1","number":"1"},' +
						'"pos":{"name":"Kasse 3","number":"03"},' +
						'"sales":[' +
						'{' +
						'"bookingTime":"2014-12-12T19:45:14.000+01:00",' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"modifier":1,' +
						'"description":"Coca Cola",' +
						'"sortingOrder":0,' +
						'"hierarchicalOutline":"1",' +
						'"price":2.95,' +
						'"product":{"name":"Coca Cola","number":"1001"},' +
						'"quantity":5,' +
						'"recognitionCode":"1001",' +
						'"sector":{"name":"Demo sector","number":"1"},' +
						'"taxPayments":[{"amount":2.35,"taxRate":19,"vat":true}],' +
						'"total":{"gross":14.75,"net":12.4,"value":14.75}' +
						'},{' +
						'"bookingTime":"2014-12-12T19:45:20.000+01:00",' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"modifier":2,' +
						'"description":"Fanta",' +
						'"sortingOrder":1,' +
						'"hierarchicalOutline":"2",' +
						'"price":3,' +
						'"product":{"name":"Fanta","number":"1002"},' +
						'"quantity":1,' +
						'"recognitionCode":"1002",' +
						'"sector":{"name":"Demo sector","number":"1"},' +
						'"taxPayments":[{"amount":0.48,"taxRate":19,"vat":true}],' +
						'"total":{"gross":3,"net":2.52,"value":3}' +
						'},{' +
						'"bookingTime":"2014-12-12T19:45:34.000+01:00",' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"description":"Sprite",' +
						'"sortingOrder":2,' +
						'"hierarchicalOutline":"3",' +
						'"price":3.95,' +
						'"product":{"name":"Sprite","number":"1003"},' +
						'"quantity":1,' +
						'"recognitionCode":"1003",' +
						'"sector":{"name":"Demo sector","number":"1"},' +
						'"taxPayments":[{"amount":0.63,"taxRate":19,"vat":true}],' +
						'"total":{"gross":3.95,"net":3.32,"value":3.95}' +
						'},{' +
						'"bookingTime":"2014-12-15T21:10:09.000+01:00",' +
						'"cashier":{"name":"Jon Doe","number":"1"},' +
						'"description":"Fanta",' +
						'"modifier":4,' +
						'"sortingOrder":3,' +
						'"hierarchicalOutline":"4",' +
						'"price":3,' +
						'"product":{"name":"Fanta","number":"1002"},' +
						'"quantity":1,' +
						'"recognitionCode":"1002",' +
						'"sector":{"name":"Demo sector","number":"1"},' +
						'"taxPayments":[{"amount":0.48,"taxRate":19,"vat":true}],' +
						'"total":{"gross":3,"net":2.52,"value":3}' +
						'}' +
						'],' +
						'"total":{"gross":24.7,"net":20.76,"value":24.7},' +
						'"voided":false' +
						'},' +
						'"systemCurrency":{"isoCode":"EUR","name":"Euro","number":"1"},' +
						'"zcounter":24}');
				}
			};
		};

		function getWindowLocationUrlValue(val) {
			var items = window.location.search.substr(1).split("&");
			for (var index = 0; index < items.length; index++) {
				var tmp = items[index].split("=");
				if (tmp[0] === val)
					return decodeURIComponent(tmp[1]);
			}
			return undefined;
		}

		function escapeSpecialChars(str) {
			return str
				.replace(/\\n/g, "\\n")
				.replace(/\\'/g, "\\'")
				.replace(/\\"/g, '\\"')
				.replace(/\\&/g, "\\&")
				.replace(/\\r/g, "\\r")
				.replace(/\\t/g, "\\t")
				.replace(/\\b/g, "\\b")
				.replace(/\\f/g, "\\f");
		};

		function emptyToNull(obj) {
			return (obj === '' || obj === null || isEmptyJsonObject(obj)) ? undefined : obj;
		}

		function falseToNull(obj) {
			return (obj == false) ? undefined : obj;
		}

		function isEmptyJsonObject(obj) {
			var str = JSON.stringify(obj).replace(/\s+/g, '');
			return str === '{}';
		}

		function parseDiscount(str, portion) {
			if (str === undefined || str == null || str === '')
				return undefined;
			var i = str.lastIndexOf('%');
			if (i == -1)
				return {
					amount: parseFloat(str),
					percent: false,
					portion: portion
				};
			return {
				amount: parseFloat(str.substr(0, i)),
				percent: true,
				portion: portion
			};
		};

		function switchPercent(inputElement) {
			if (inputElement.value === '')
				return;
			if (inputElement.value.indexOf('%') === -1)
				inputElement.value = inputElement.value + '%';
			else
				inputElement.value = inputElement.value.replace('%', '');
		}

		function fillRequestLists() {
			var modifiable = function (item) { return (typeof item.modifier === 'number'); };

			fillReceiptItemsToSelect(document.modifyAccountTransaction.modifier, true, false, false, modifiable);
			fillReceiptItemsToSelect(document.modifyPayment.modifier, false, true, false, modifiable);
			fillReceiptItemsToSelect(document.modifySale.modifier, false, false, true, modifiable);

			fillReceiptItemsToSelect(document.removeReceiptItem.modifier, true, true, true, modifiable);
		}

		function fillReceiptItemsToSelect(selectElement, accountTransactions, payments, sales, filter) {

			function appendAndFilter(a, b) {
				if (typeof b !== 'object')
					return a;
				if (typeof filter === 'function')
					b = b.filter(filter);
				return a.concat(b);
			}

			var receipt = korona_plugin_api.request.receipt;

			var receiptItems = [];
			if (accountTransactions)
				receiptItems = appendAndFilter(receiptItems, receipt.accountTransactions);
			if (payments)
				receiptItems = appendAndFilter(receiptItems, receipt.payments);
			if (sales)
				receiptItems = appendAndFilter(receiptItems, receipt.sales);

			receiptItems.sort(function (a, b) { return a.sortingOrder - b.sortingOrder; });

			if (typeof filter === 'function')
				receiptItems = receiptItems.filter(filter);

			selectElement.innerHTML = '';
			for (var i = 0; i < receiptItems.length; i++) {
				var option = document.createElement('option');
				option.setAttribute('value', receiptItems[i].modifier);
				if (typeof receiptItems[i].modifier === 'number')
					option.appendChild(document.createTextNode('(' + receiptItems[i].modifier + ') - ' + receiptItems[i].description));
				else
					option.appendChild(document.createTextNode(receiptItems[i].description));
				selectElement.appendChild(option);
			}
		}

		function fillActionsLists() {
			fillActionsToSelect(document.startActions.actions);
		}

		function fillActionsToSelect(selectElement) {
			selectElement.innerHTML = '';
			for (var i = 0; i < korona_plugin_api.response.actions.length; i++) {
				var action = korona_plugin_api.response.actions[i];
				var option = document.createElement('option');
				option.appendChild(document.createTextNode('[' + i + '] - ' + action.type));
				selectElement.appendChild(option);
			}
		}

		function submitIdentifyAs(form) {
			korona_plugin_api.response.identifyAs(form.key.value, form.version.value);
			return false;
		}

		function submitAddAccountTransaction(form) {
			korona_plugin_api.response.addAccountTransaction({
				accountNumber: emptyToNull(form.accountNumber.value),
				amount: emptyToNull(form.amount.value),
				description: emptyToNull(form.description.value),
				fixedAmount: emptyToNull(form.fixedAmount.checked),
				notRemovable: emptyToNull(form.notRemovable.checked),
				customData: emptyToNull(form.customData.value),
				serialNumbers: emptyToNull(collectSerialNumbers(form)),
				infoTexts: emptyToNull(collectInfoTexts(form))
			});
			form.reset();
			return false;
		}

		function addSerialNumber(form) {
			if (form.serialNumber.value === '')
				return;
			var option = document.createElement('option');
			option.appendChild(document.createTextNode(form.serialNumber.value));
			form.serialNumbers.appendChild(option);
			form.serialNumber.value = '';
		}

		function removeSerialNumber(form) {
			if (form.serialNumbers.selectedIndex === -1)
				return;
			form.serialNumbers.remove(form.serialNumbers.selectedIndex);
		}

		function collectSerialNumbers(form) {
			if (form.modifySerialNumbers && !form.modifySerialNumbers.checked)
				return null;
			var options = [];
			for (var i = 0; i < form.serialNumbers.options.length; i++)
				options.push(form.serialNumbers.options[i].innerHTML);
			return options;
		}

		function submitAddPayment(form) {
			korona_plugin_api.response.addPayment({
				inputAmount: emptyToNull(form.inputAmount.value),
				paymentMethodNumber: emptyToNull(form.paymentMethodNumber.value),
				customData: emptyToNull(form.customData.value),
				balanceInfo: emptyToNull(form.balanceInfo.value),
				paymentCardInformation: emptyToNull({
					number: emptyToNull(form.cardNumber.value),
					holderName: emptyToNull(form.cardHolderName.value)
				})
			});
			form.reset();
			return false;
		}

		function submitAddSale(form) {

			korona_plugin_api.response.addSale({
				discount: parseDiscount(emptyToNull(form.discount.value), emptyToNull(form.discountPortion.checked)),
				infoTexts: emptyToNull(collectInfoTexts(form)),
				notRemovable: emptyToNull(form.notRemovable.checked),
				description: emptyToNull(form.description.value),
				price: emptyToNull(form.price.value),
				quantity: emptyToNull(form.quantity.value),
				recognitionCode: emptyToNull(form.recognitionCode.value),
				useAlternativeSector: emptyToNull(form.useAlternativeSector.checked),
				serialNumbers: emptyToNull(collectSerialNumbers(form)),
				customData: emptyToNull(form.customData.value),
				productTemplate: emptyToNull({
					product: emptyToNull({
						number: emptyToNull(form.templateProductNumber.value),
						name: emptyToNull(form.templateProductName.value)
					}),
					commodityGroup: emptyToNull({
						number: emptyToNull(form.templateCommodityGroupNumber.value),
						name: emptyToNull(form.templateCommodityGroupName.value)
					}),
					sector: emptyToNull({
						number: emptyToNull(form.templateSectorNumber.value),
						name: emptyToNull(form.templateSectorName.value),
						tax: emptyToNull({
							rate: emptyToNull(form.templateSectorTaxRate.value),
							vat: falseToNull(form.templateSectorTaxVat.checked),
						})
					}),
					alternativeSector: emptyToNull({
						number: emptyToNull(form.templateAlternativeSectorNumber.value),
						name: emptyToNull(form.templateAlternativeSectorName.value),
						tax: emptyToNull({
							rate: emptyToNull(form.templateAlternativeSectorTaxRate.value),
							vat: falseToNull(form.templateAlternativeSectorTaxVat.checked),
						})
					})
				}),
				ticketDefinition: emptyToNull({
					mergedTicketPrintout: falseToNull(form.mergedTicketPrintout.checked)
				})
			});
			form.infoTexts.innerHTML = '';
			form.reset();
			return false;
		}

		function addInfoText(form) {
			if (form.infoText.value === '')
				return;
			var option = document.createElement('option');
			option.appendChild(document.createTextNode(form.infoText.value));
			form.infoTexts.appendChild(option);
			form.infoText.value = '';
		}

		function removeInfoText(form) {
			if (form.infoTexts.selectedIndex === -1)
				return;
			form.infoTexts.remove(form.infoTexts.selectedIndex);
		}

		function collectInfoTexts(form) {
			if (form.modifyInfoTexts && !form.modifyInfoTexts.checked)
				return null;
			var options = [];
			for (var i = 0; i < form.infoTexts.options.length; i++)
				options.push(form.infoTexts.options[i].innerHTML);
			return options;
		}

		function submitDisplayMessage(form) {
			korona_plugin_api.response.displayMessage({
				text: emptyToNull(form.text.value),
				title: emptyToNull(form.title.value),
				level: emptyToNull(form.level.value)
			});
			form.reset();
			return false;
		}

		function submitLogMessage(form) {
			korona_plugin_api.response.logMessage({
				text: emptyToNull(form.text.value),
				level: emptyToNull(form.level.value)
			});
			form.reset();
			return false;
		}

		function submitModifyAccountTransaction(form) {
			korona_plugin_api.response.modifyAccountTransaction({
				modifier: form.modifier.value,
				amount: emptyToNull(form.amount.value),
				fixedAmount: emptyToNull(form.fixedAmount.checked),
				notRemovable: emptyToNull(form.notRemovable.checked),
				customData: emptyToNull(form.customData.value),
				serialNumbers: emptyToNull(collectSerialNumbers(form)),
				infoTexts: emptyToNull(collectInfoTexts(form))
			});
			form.reset();
			return false;
		}

		function submitModifyPayment(form) {
			korona_plugin_api.response.modifyPayment({
				modifier: form.modifier.value,
				customData: emptyToNull(form.customData.value)
			});
			form.reset();
			return false;
		}

		function submitModifySale(form) {
			korona_plugin_api.response.modifySale({
				modifier: form.modifier.value,
				discount: parseDiscount(emptyToNull(form.discount.value), emptyToNull(form.discountPortion.checked)),
				infoTexts: emptyToNull(collectInfoTexts(form)),
				price: emptyToNull(form.price.value),
				quantity: emptyToNull(form.quantity.value),
				useAlternativeSector: emptyToNull(form.useAlternativeSector.value),
				serialNumbers: emptyToNull(collectSerialNumbers(form)),
				customData: emptyToNull(form.customData.value),
				ticketDefinition: emptyToNull({
					mergedTicketPrintout: falseToNull(form.mergedTicketPrintout.checked)
				})
			});
			form.infoTexts.innerHTML = '';
			form.reset();
			return false;
		}

		function submitPrintMessage(form) {
			korona_plugin_api.response.printMessage({
				text: emptyToNull(form.text.value),
				title: emptyToNull(form.title.value),
				qrCode: emptyToNull(form.qrCode.value),
				code39Barcode: emptyToNull(form.code39Barcode.value),
				printFooter: emptyToNull(form.printFooter.checked),
				printHeader: emptyToNull(form.printHeader.checked),
				lines: collectFormattedLines(form)
			});
			form.formattedLines.innerHTML = '';
			form.reset();
			return false;
		}

		function addFormattedLine(form) {
			if (form.lineText.value === '')
				return;
			var option = document.createElement('option');
			option.className = 'formatted-line ' + form.fontSize.value + ' ' + form.fontWeight.value;
			option.appendChild(document.createTextNode(form.lineText.value));
			var line = {
				text: emptyToNull(form.lineText.value),
				fontSize: emptyToNull(form.fontSize.value),
				fontWeight: emptyToNull(form.fontWeight.value),
				code39Barcode: emptyToNull(form.lineCode39Barcode.value),
				qrCode: emptyToNull(form.lineQrCode.value)
			};
			option.setAttribute("data-json", JSON.stringify(line));
			form.formattedLines.appendChild(option);
			form.lineText.value = '';
			form.lineCode39Barcode.value = '';
			form.lineQrCode.value = '';
		}

		function removeFormattedLine(form) {
			if (form.formattedLines.selectedIndex === -1)
				return;
			form.formattedLines.remove(form.formattedLines.selectedIndex);
		}

		function collectFormattedLines(form) {
			var options = [];
			for (var i = 0; i < form.formattedLines.options.length; i++)
				options.push(korona_plugin_api.response.createFormattedLine(JSON.parse(form.formattedLines.options[i].getAttribute("data-json"))));
			return options;
		}

		function submitRemoveReceiptItem(form) {
			korona_plugin_api.response.removeReceiptItem({
				modifier: form.modifier.value
			});
			form.reset();
			return false;
		}

		function submitSetInputLine(form) {
			korona_plugin_api.response.setInputLine({
				value: emptyToNull(form.value.value)
			});
			form.reset();
			return false;
		}

		function submitSetReceiptCustomer(form) {
			korona_plugin_api.response.setReceiptCustomer({
				address: emptyToNull({
					city: emptyToNull(form.city.value),
					country: emptyToNull(form.country.value),
					line1: emptyToNull(form.line1.value),
					line2: emptyToNull(form.line2.value),
					postalCode: emptyToNull(form.postalCode.value),
					state: emptyToNull(form.state.value)
				}),
				alternativePhone: emptyToNull(form.alternativePhone.value),
				birthday: emptyToNull(form.birthday.value),
				company: emptyToNull(form.company.value),
				fax: emptyToNull(form.fax.value),
				firstName: emptyToNull(form.firstName.value),
				gender: emptyToNull(form.gender.value),
				lastName: emptyToNull(form.lastName.value),
				number: emptyToNull(form.number.value),
				phone: emptyToNull(form.phone.value),
				salutation: emptyToNull(form.salutation.value),
				title: emptyToNull(form.title.value)
			});
			form.reset();
			return false;
		}

		function submitSetReceiptCustomerGroup(form) {
			korona_plugin_api.response.setReceiptCustomerGroup({
				customerGroupNumber: emptyToNull(form.customerGroupNumber.value)
			});
			form.reset();
			return false;
		}

		function submitSetReceiptDiscount(form) {
			korona_plugin_api.response.setReceiptDiscount(
				parseDiscount(emptyToNull(form.amount.value))
			);
			form.reset();
			return false;
		}

		function submitSetReceiptCustomData(form) {
			korona_plugin_api.response.setReceiptCustomData({
				customData: emptyToNull(form.customData.value)
			});
			form.reset();
			return false;
		}

		function submitCallExternalSystem(form) {
			korona_plugin_api.response.callExternalSystem({
				displayUrl: emptyToNull(form.displayUrl.value),
				displayUrlPost: emptyToNull(form.displayUrlPost.checked),
				systemUrl: emptyToNull(form.systemUrl.value),
				login: emptyToNull(form.dontStoreLogin.value),
				password: emptyToNull(form.dontStorePassword.value),
				connectTimeoutMillis: emptyToNull(form.connectTimeoutMillis.value),
				readTimeoutMillis: emptyToNull(form.readTimeoutMillis.value)
			});
			form.reset();
			return false;
		}

		function submitShowWebPage(form) {
			korona_plugin_api.response.showWebPage({
				displayUrl: emptyToNull(form.displayUrl.value),
				displayUrlPost: emptyToNull(form.displayUrlPost.checked),
				login: emptyToNull(form.dontStoreLogin.value),
				password: emptyToNull(form.dontStorePassword.value)
			});
			form.reset();
			return false;
		}

		function submitSetCustomerDisplayMediaUrl(form) {
			korona_plugin_api.response.setCustomerDisplayMediaUrl({
				mediaUrl: emptyToNull(form.mediaUrl.value)
			});
			form.reset();
			return false;
		}

		function submitUnsetReceiptCustomer(form) {
			korona_plugin_api.response.unsetReceiptCustomer();
			form.reset();
			return false;
		}

		function submitUnsetReceiptCustomerGroup(form) {
			korona_plugin_api.response.unsetReceiptCustomerGroup();
			form.reset();
			return false;
		}

		function submitSetReceiptOrderNumber(form) {
			korona_plugin_api.response.setReceiptOrderNumber({
				orderNumber: emptyToNull(form.orderNumber.value)
			});
			form.reset();
			return false;
		}

		function submitSetLoyaltyCardNumber(form) {
			korona_plugin_api.response.setLoyaltyCardNumber({
				loyaltyCardNumber: emptyToNull(form.loyaltyCardNumber.value)
			});
			form.reset();
			korona_plugin_api.backToKorona()
			return false;
		}

		function submitShowButtons(form) {
			korona_plugin_api.response.showButtons({
				title: emptyToNull(form.title.value),
				buttons: collectButtons(form),
				buttonLayoutNumber: emptyToNull(form.buttonLayoutNumber.value)
			});
			form.buttons.innerHTML = '';
			form.reset();
			return false;
		}

		function addButton(form) {
			if (form.label.value === '')
				return;
			var actions = null;
			try {
				actions = JSON.parse(emptyToNull(form.actionsJson.value));
			} catch (e) {

				return;
			}
			var option = document.createElement('option');
			option.className = form.fontSize.value + ' ' + form.color.value;
			option.appendChild(document.createTextNode(form.row.value + ':' + form.column.value + ' ' + form.label.value));
			var button = {
				row: emptyToNull(form.row.value),
				column: emptyToNull(form.column.value),
				label: emptyToNull(form.label.value),
				fontSize: emptyToNull(form.fontSize.value),
				color: emptyToNull(form.color.value),
				layout: emptyToNull(form.layout.value),
				actions: actions
			};
			option.setAttribute("data-json", JSON.stringify(button));
			form.buttons.appendChild(option);
			form.label.value = '';
		}

		function removeButton(form) {
			if (form.buttons.selectedIndex === -1)
				return;
			form.buttons.remove(form.buttons.selectedIndex);
		}

		function collectButtons(form) {
			var options = [];
			for (var i = 0; i < form.buttons.options.length; i++)
				options.push(korona_plugin_api.response.createButton(JSON.parse(form.buttons.options[i].getAttribute("data-json"))));
			return options;
		}

		function submitSwitchButtonBadges(form) {
			korona_plugin_api.response.switchButtonBadges({
				badges: collectButtonBadges(form)
			});
			form.badges.innerHTML = '';
			form.reset();
			return false;
		}

		function addButtonBadge(form) {
			if (form.productTags.value === '')
				return;
			var productTags = form.productTags.value.split(' ');
			var option = document.createElement('option');
			option.className = form.color.value;
			option.appendChild(document.createTextNode(productTags));
			var badge = {
				color: emptyToNull(form.color.value),
				productTags: emptyToNull(productTags)
			};
			option.setAttribute("data-json", JSON.stringify(badge));
			form.badges.appendChild(option);
		}

		function removeButtonBadge(form) {
			if (form.badges.selectedIndex === -1)
				return;
			form.badges.remove(form.badges.selectedIndex);
		}

		function collectButtonBadges(form) {
			var options = [];
			for (var i = 0; i < form.badges.options.length; i++)
				options.push(korona_plugin_api.response.createButtonBadge(JSON.parse(form.badges.options[i].getAttribute("data-json"))));
			return options;
		}

		function submitSetAdditionalReceiptInfo(form) {
			korona_plugin_api.response.setAdditionalReceiptInfo({
				additionalReceiptInfoTypeNumber: emptyToNull(form.additionalReceiptInfoTypeNumber.value),
				info: emptyToNull(form.info.value)
			});
			form.reset();
			return false;
		}

		function submitSetReceiptInfotexts(form) {
			korona_plugin_api.response.setReceiptInfotexts({
				infoTexts: emptyToNull(collectInfoTexts(form))
			});
			form.reset();
			return false;
		}

		function submitSetReceiptFinishBlockingIndicator(form) {
			if (form.unset.checked) {
				korona_plugin_api.response.unsetReceiptFinishBlockingIndicator();
			} else {
				korona_plugin_api.response.setReceiptFinishBlockingIndicator({
					message: form.message.value
				});
			}
			form.reset();
			return false;
		}
	</script>
</head>

<body>

	<div class="container">
		<h2>Enter your loyalty number</h2>
		<div class="panel-group">
			<div class="panel-body">
				<form class="form" name="setLoyaltyCardNumber" action="" onsubmit="return submitSetLoyaltyCardNumber(document.setLoyaltyCardNumber);">
					<div class="row">
						<div class="col-xs-4">
							<div class="form-group">
								<label class="sr-only" for="customData">Loyalty number</label>
								<input class="form-control" type="text" name="loyaltyCardNumber" id="loyaltyCardNumber" placeholder="Loyalty number"></input>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<div class="form-group">
								<button class="btn btn-primary" type="submit">Submit</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="keypad">
			<button class="btn btn-default keypad-button" data-key="1">1</button>
			<button class="btn btn-default keypad-button" data-key="2">2</button>
			<button class="btn btn-default keypad-button" data-key="3">3</button>
			<button class="btn btn-default keypad-button" data-key="4">4</button>
			<button class="btn btn-default keypad-button" data-key="5">5</button>
			<button class="btn btn-default keypad-button" data-key="6">6</button>
			<button class="btn btn-default keypad-button" data-key="7">7</button>
			<button class="btn btn-default keypad-button" data-key="8">8</button>
			<button class="btn btn-default keypad-button" data-key="9">9</button>
			<button class="btn btn-default keypad-button" data-key="clear">Clear</button>
			<button class="btn btn-default keypad-button" data-key="0">0</button>
			<button class="btn btn-default keypad-button" data-key="backspace">&larr;</button>
		</div>
	</div>
			<form class="form-inline" name="startActions" action="" onsubmit="korona_plugin_api.response.startActions(); return false;">
				<div class="form-group">
					<label class="sr-only" for="actions"></label>
					<select class="form-control" name="actions"></select>
				</div>
				<button class="btn btn-default" type="button" onclick="korona_plugin_api.response.removeAction(document.startActions.actions.selectedIndex);"></button>
				<p></p>
			</form>

			<hr />

			<p id="responseData"></p>

			<hr />
			<form class="form-inline" name="backToKoronaForm" action="">

			</form>
			<p></p>
		</div>
		<script src="keyboard.js"></script>
</body>

</html>
