function wistiaUploaderController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.progress = {
        show: false,
        style: {
            width: "0%"
        }
    };

    ctrl.error = {
        show: false,
        message: "Failed to upload"
    };

    ctrl.player = {
        show: false,
        id: null
    };

    this.$postLink = function () {
        var $input = $element.find('input.fileupload');

        $input.fileupload({
            dataType: "json",
            add: function (e, data) {
                ctrl.error.show = false;
                ctrl.player.show = false;
                ctrl.progress.show = true;
                data.submit();
                $scope.$apply();
            },
            done: function (e, data) {
                ctrl.progress.show = false;
                var hash = data.result.hashed_id;
                ctrl.player.id = "wistia_" + hash;
                ctrl.player.show = true;
                $scope.$apply();
                Wistia.embed(hash);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                ctrl.error.message = errorThrown;
                ctrl.progress.show = false;
                ctrl.error.show = true;
                $scope.$apply();
            },
            progress: function (e, data) {
                ctrl.progress.style.width = parseInt(data.loaded / data.total * 100, 10) + "%";
                $scope.$apply();
            }
        });

    };
}

angular.module('processStreet').component('wistiaUploader', {
    templateUrl: './components/wistia-uploader.html',
    bindings: {
        input: '@'
    },
    controller: wistiaUploaderController
});