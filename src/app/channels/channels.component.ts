import { UserManagementService } from '../core/shared/services/user-management.service';
import { ElementRef, ViewChild, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import 'bootstrap';
import { ValidationMessage } from '../core/shared/models';

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

    @ViewChild('tableComp') tableComp: TableComponent;
    @ViewChild('add_channel_modal') add_channel_modal: ElementRef;
    @ViewChild('channelImage') channelImage: ElementRef;
    @ViewChild('update_channel_modal') update_channel_modal: ElementRef;
    @ViewChild('appspinner') spinner: SpinnerComponent;

    channel_list: any = null;
    public channelForm: FormGroup;
    public editChannelForm: FormGroup;
    catentryId: any;
    loading: boolean = false;

    constructor(private userService: UserManagementService, private chRef: ChangeDetectorRef, private fb: FormBuilder) {
        this.channelForm = this.fb.group({
            chnumber: ['', Validators.required],
            chname: ['', Validators.required],
            price: ['', Validators.required],
            channelImage: ['', Validators.required]
        });
        this.editChannelForm = this.fb.group({
            chnumber: ['', Validators.required],
            chname: ['', Validators.required],
            price: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadChannelList();
    }
    loadChannelList() {
        this.userService.getAllChannelList().subscribe(res => {
            if (res.status == 200) {
                this.channel_list = null;
                this.channel_list = res.data;
            } else {
                alert(ValidationMessage.SOMETHING_WENT_WRONG);
            }
            this.chRef.detectChanges();
            this.tableComp.initalizeTable(this.channel_list);

        }, error => {
            alert(ValidationMessage.SOMETHING_WENT_WRONG);
        }, () => {

        });
    }

    openAddModal() {
        console.log("open modal");
        $(this.add_channel_modal.nativeElement).modal('show');
    }

    openEditModal(data) {
        console.log(data);
        let body = { "id": data };
        this.userService.getChannelDetail(body).subscribe(res => {
            if (res.status == 200) {
                this.initUpdateForm(res.data);
                this.catentryId = data;
                $(this.update_channel_modal.nativeElement).modal('show');
            } else {
                alert(ValidationMessage.SOMETHING_WENT_WRONG);
            }
        }, error => {
            alert(ValidationMessage.SOMETHING_WENT_WRONG);
        }, () => {

        });

    }

    initUpdateForm(data: any) {
        this.editChannelForm = this.fb.group({
            chnumber: [data.chnumber, Validators.required],
            chname: [data.chname, Validators.required],
            price: [data.price, Validators.required]
        });
    }

    openRemoveModal(data) {
        console.log(data);
        let body = { "id": data };
        if (confirm('Are You Sure?')) {
            this.userService.removeChannel(body).subscribe(res => {
                this.spinner.loading = true;
                if (res.status == 200) {
                    this.tableComp.destroyTable();
                    this.loadChannelList();
                } else {
                    alert(res.message);
                }
            }, error => {
                alert(ValidationMessage.SOMETHING_WENT_WRONG);
            }, () => {
                this.spinner.loading = false;
            });
        }
    }

    addChannel() {
        console.log("add channel");
        this.spinner.loading = true;
        this.loading = true;
        console.log(this.channelImage.nativeElement.files[0]);
        let body = this.getFormData(this.channelForm, false);
        this.userService.addChannel(body).subscribe(res => {
            if (res.status == 200) {
                this.tableComp.destroyTable();
                this.loadChannelList();
                $(this.add_channel_modal.nativeElement).modal('hide');
            } else {
                alert(res.message);
            }
            this.spinner.loading = false;
            this.loading = false;
        }, error => {
            alert(ValidationMessage.SOMETHING_WENT_WRONG);
            this.spinner.loading = false;
            this.loading = false;
        }, () => {

        });
    }

    updateChannel(id: any) {
        console.log("add channel");
        if (!this.catentryId) {
            alert('Invalid Input [productId]');
            return;
        }
        this.spinner.loading = true;
        this.loading = true;
        let body = this.getFormData(this.editChannelForm, true);
        body.append('catentryId', this.catentryId);
        this.userService.updateChannel(body).subscribe(res => {
            if (res.status == 200) {
                this.tableComp.destroyTable();
                this.loadChannelList();
                $(this.update_channel_modal.nativeElement).modal('hide');
            } else {
                alert(res.message);
            }
            this.spinner.loading = false;
            this.loading = false;
        }, error => {
            alert(ValidationMessage.SOMETHING_WENT_WRONG);
            this.spinner.loading = false;
            this.loading = false;
        }, () => {

        });
    }

    getFormData(form: FormGroup, isEdit: boolean) {
        let formData: FormData = new FormData();
        formData.append('chnumber', form.get('chnumber').value);
        formData.append('chname', form.get('chname').value);
        formData.append('price', form.get('price').value);
        if (!isEdit) {
            let image = this.channelImage.nativeElement.files;
            if (image && image.length > 0) {
                formData.append('channelImage', image[0]);
            }
        }
        return formData;
    }

}
